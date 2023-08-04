import HexToRgb from "../functions/HexToRgb";
import HexToFilter from "../functions/HexToFilter";
import castells from "../data/joc-castells.json";

import * as v3 from './joc-castells-probabilities/v3/generateCastellResult.js'

const INITIAL_CASTELLERS = 15;
const MIN_CASTELLERS = 31;

class Colla {
	constructor({
			name,
			color,
			castellers=INITIAL_CASTELLERS,
			actualCastellers=INITIAL_CASTELLERS,
			stats=null,
			historic=[],
			tried=[],
			missions_accepted=[],
			missions_completed=[],
			date=Date.parse('2023-09-18'), // dilluns
			today=null
		}) {
		this.name = name;
		this.color = color;
		const rgb = HexToRgb(color);
		this.highContrast = 0.2126*rgb.r + 0.7152*rgb.g + 0.0722*rgb.b < 128 ? 'white' : 'black';
		let filter;
		do {
			filter = HexToFilter(rgb);
			this.filter = filter.filter;
		} while(filter.loss > 0.1);
		this.castellers = castellers;
		this.actualCastellers = actualCastellers;
		if (!stats) {
			this.stats = Object.fromEntries(
				Object.entries(castells)
					.map(([castell, attrs]) => [castell, {
						...attrs,
						stats: []
					}])
			);
		} else
			this.stats = stats;
		this.historic = historic;
		this.tried = tried;
		this.missions_accepted = missions_accepted;
		this.missions_completed = missions_completed;
		this.date = date;
		if (!today)
			this.today = this.getToday();
		else
			this.today = today;
	}
	static fromJson(json) {
		const name = json.name;
		const color = json.color;
		const castellers = json.castellers;
		const actualCastellers = json.actualCastellers;
		const stats = json.stats;
		const historic = json.historic;
		const tried = json.tried;
		const missions_accepted = json.missions_accepted;
		const missions_completed = json.missions_completed;
		const date = json.date;
		const today = json.today;
		if (name && color && castellers && stats && historic && tried && missions_accepted && missions_completed && date && today)
			return new Colla({
				name: name,
				color: color,
				castellers: castellers,
				actualCastellers: actualCastellers,
				stats: stats,
				historic: historic,
				tried: tried,
				missions_accepted: missions_accepted,
				missions_completed: missions_completed,
				date: date,
				today: today
			});

		throw new Error("L'arxiu no conté cap partida.");
	}
	addCastellers(castellers) {
		this.castellers += castellers;
		return castellers;
	}
	takeCastellers(castellers) {
		if (this.castellers <= MIN_CASTELLERS) return 0;
		const prev_castellers = this.castellers;
		this.castellers = Math.max(this.castellers - castellers, MIN_CASTELLERS);
		return prev_castellers - this.castellers;
	}
	getCastellResult(castell, is_assaig) {
		const { result, oldProbs } = v3.generateCastellResult({
			stats: this.stats,
			castell: castell.castell,
		})

		// eslint-disable-next-line
		const { newProbs } = v3.updateProbs({
			stats: this.stats,
			castell: castell.castell,
			result: result,
		})

		this.stats[castell.castell].stats.push({
			resultat: result,
			intentat_at: new Date(),
			context: is_assaig ? 'assaig' : 'actuacio',
			probabilitats: oldProbs
		});
		if (!this.tried.includes(castell.castell))
			this.tried.push(castell.castell);
		
		if (this.today.type === 'assaig')
			this.today.provesLeft -= 1;

		return result;
	}
	addActuacio(actuacio) {
		if (this.today.type === 'actuacio')
			this.today.done = true;
		
		this.historic.push({
			'castells': actuacio,
			'punts': actuacio.reduce((sum, next) => { return { punts: sum.punts + next.punts } }).punts,
			'data': new Date()
		});
	}
	getToday() {
		const weekday = new Date(this.date).getDay();

		if (weekday === 4)
			return {
				type: 'actuacio',
				done: false
			}
		return {
			type: 'assaig',
			provesLeft: 15
		}
	}
	calculateActualCastellers(prev_weekday) {
		const isAbleToDoDiada = this.castellers >= MIN_CASTELLERS

		const min_assistance =
			// Serà diada = 100%
			prev_weekday === 2 && isAbleToDoDiada ? 0.9 :
			// Serà dilluns = 60%
			prev_weekday === 2 && !isAbleToDoDiada ? 0.6 :
			// Serà dilluns (també) = 60%
			prev_weekday === 4 ? 0.6 :
			// Serà dimarts = 80%
			prev_weekday === 1 ? 0.8 :
			// ? = 100%
			1

		const scaledRandom = Math.random() * (1 - min_assistance) + min_assistance
		const actualCastellers = Math.floor(this.castellers * scaledRandom);
		return actualCastellers;
	}
	nextDay() {
		const date = new Date(this.date);
		const weekday = date.getDay();

		this.actualCastellers = this.calculateActualCastellers(weekday)

		if (weekday === 1)
			date.setDate(date.getDate() + 1)
		if (weekday === 2)
			date.setDate(date.getDate() + (this.castellers < MIN_CASTELLERS ? 6 : 2))
		if (weekday === 4)
			date.setDate(date.getDate() + 4)
		
		this.date = date;
		this.today = this.getToday();
	}
	acceptMission(mission) {
		const objectives_assaig = mission['objectives']['assaig'];
		const objectives_actuacio = mission['objectives']['actuacio'];

		let objectives = 0;
		if (objectives_assaig) {
			for (let i = 0; i < objectives_assaig.length; i++, objectives++)
				objectives_assaig[i] = this.setObjectiveInitialValues(objectives_assaig[i]);
			mission['objectives']['assaig'] = objectives_assaig;
		}

		if (objectives_actuacio) {
			for (let i = 0; i < objectives_actuacio.length; i++, objectives++)
				objectives_actuacio[i] = this.setObjectiveInitialValues(objectives_actuacio[i]);
			mission['objectives']['actuacio'] = objectives_actuacio;
		}

		mission['todo'] = objectives;
		mission['completed'] = 0;

		this.missions_accepted.push(mission);
	}
	setObjectiveInitialValues(objective) {
		if (objective['amount'])
			objective['current'] = 0
		
		objective['completed'] = false;
		
		return objective;
	}
	checkIfMissionCompleted(context, castell, result) {
		for (let mission of this.missions_accepted) {
			let completed = 0;
			for (let objective of mission['objectives'][context]) {
				if (objective['completed']) continue;
				if (objective['castell'] === castell) {
					if (objective['action'] === result) {
						objective['current'] += 1;
						if (objective['current'] === objective['amount']) {
							objective['completed'] = true;
							completed += 1;
						}
					}
				}
			}
			if (completed > 0) {
				mission['completed'] += completed;
				if (mission['todo'] === mission['completed'])
					this.completeMission(mission);
			}
		}
	}
	completeMission(mission) {
		this.missions_accepted.splice(this.missions_accepted.indexOf(mission), 1);

		for (let reward of mission['rewards'])
			this.giveReward(reward);

		mission['completed'] = true;
		this.missions_completed.push(mission);
	}
	giveReward(reward) {
		if (reward['type'] === 'castellers')
			this.addCastellers(reward['amount']);
	}
}

export default Colla;
