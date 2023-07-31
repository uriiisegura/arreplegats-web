import HexToRgb from "../functions/HexToRgb";
import HexToFilter from "../functions/HexToFilter";
import Normalize from "../functions/Normalize";
import castells from "../data/joc-castells.json";

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
		const results = ['DESCARREGAT', 'CARREGAT', 'INTENT', 'INTENT DESMUNTAT'];
		const coeficients = [
			[ 1.1, 1.05, 0.95, 0.9  ],
			[ 1  , 0.9 , 0.8 , 1.1  ],
			[ 0.8, 0.9 , 0.9 , 1.05 ],
			[ 1  , 1.05, 1.1 , 0.8  ]
		];

		const probabilities = this.stats[castell.castell].probabilitatsActual;

		const cumulativeProbabilities = [];
		let cumulativeSum = 0;
		for (const prob of probabilities)
			cumulativeProbabilities.push(cumulativeSum += prob);

		const prob_result = Math.random();
		let result = 3;
		for (let i = 0; i < 4; i++)
			if (prob_result <= cumulativeProbabilities[i]) {
				result = i;
				break;
			}
		
		const new_probabilities = []
		for (let i = 0; i < 4; i++)
			new_probabilities.push(probabilities[i] * coeficients[result][i]);
		
		if (new_probabilities[0] > castell.probabilitatsLimit[0])
			new_probabilities[0] = castell.probabilitatsLimit[0]
		else if (new_probabilities[0] < castell.probabilitatsLimit[1])
			new_probabilities[0] = castell.probabilitatsLimit[1]
		
		this.stats[castell.castell].stats.push({
			resultat: results[result],
			intentat_at: new Date(),
			context: is_assaig ? 'assaig' : 'actuacio',
			probabilitats: probabilities
		});
		this.stats[castell.castell].probabilitatsActual = Normalize(new_probabilities);
		if (!this.tried.includes(castell.castell))
			this.tried.push(castell.castell);

		return results[result];
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
