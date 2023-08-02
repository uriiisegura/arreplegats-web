import HexToRgb from "../functions/HexToRgb";
import HexToFilter from "../functions/HexToFilter";
import castells from "../data/joc-castells.json";

import * as v3 from './joc-castells-probabilities/v3/generateCastellResult.js'

const INITIAL_CASTELLERS = 15;
const MIN_CASTELLERS = 31;

class Colla {
	constructor(name,
				color,
				castellers=INITIAL_CASTELLERS,
				stats=null,
				historic=[],
				tried=[],
				missions_accepted=[],
				missions_completed=[],
				date=Date.parse('2023-09-18'), // dilluns
				today=null
		) {
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
		const stats = json.stats;
		const historic = json.historic;
		const tried = json.tried;
		const missions_accepted = json.missions_accepted;
		const missions_completed = json.missions_completed;
		const date = json.date;
		const today = json.today;
		if (name && color && castellers && stats && historic && tried && missions_accepted && missions_completed && date && today)
			return new Colla(name, color, castellers, stats, historic, tried, missions_accepted, missions_completed, date, today);
		throw new Error("L'arxiu no conté cap partida.");
	}
	addCastellers(castellers) {
		this.castellers += castellers;
		return castellers;
	}
	takeCastellers(castellers) {
		castellers = Math.min(castellers, MIN_CASTELLERS);
		this.castellers -= castellers;
		return castellers;
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
	nextDay() {
		const date = new Date(this.date);
		const weekday = date.getDay();

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
		this.missions_accepted.push(mission);
	}
}

export default Colla;
