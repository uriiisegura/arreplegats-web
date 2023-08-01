import HexToRgb from "../functions/HexToRgb";
import HexToFilter from "../functions/HexToFilter";
import Normalize from "../functions/Normalize";
import castells from "../data/joc-castells.json";

import * as v3 from './joc-castells-probabilities/v3/getCastellResult.js'

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
				date=Date.parse('2022-09-01')
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
			const stats_dict = {};
			for (let castell of castells)
				stats_dict[castell.castell] = {
					probabilitatsActual: castell.probabilitatsInicials,
					stats: []
				};
			this.stats = stats_dict;
		} else
			this.stats = stats;
		this.historic = historic;
		this.tried = tried;
		this.missions_accepted = missions_accepted;
		this.missions_completed = missions_completed;
		this.date = date;
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
		if (name && color && castellers && stats && historic && tried && missions_accepted && missions_completed && date)
			return new Colla(name, color, castellers, stats, historic, tried, missions_accepted, missions_completed, date);
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
		const { result, oldProbs } = v3.getCastellResult({
			stats: this.stats,
			castell: castell,
		})

		const { newProbs } = v3.updateProbs({
			stats: this.stats,
			castell: castell,
			result: result,
		})

		this.stats[castell.castell].stats.push({
			resultat: result,
			intentat_at: new Date(),
			context: is_assaig ? 'assaig' : 'actuacio',
			probabilitats: oldProbs
		});
		this.stats[castell.castell].probabilitatsActual = Normalize(newProbs);
		if (!this.tried.includes(castell.castell))
			this.tried.push(castell.castell);

		return result;
	}
	addActuacio(actuacio) {
		this.historic.push({
			'castells': actuacio,
			'punts': actuacio.reduce((sum, next) => { return { punts: sum.punts + next.punts } }).punts,
			'data': new Date()
		});
	}
}

export default Colla;
