import HexToRgb from "../functions/HexToRgb";
import HexToFilter from "../functions/HexToFilter";

class Colla {
	constructor(name,
				color,
				castellers=50,
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
		} while(filter.loss > 0.15);
		this.castellers = castellers;
		this.date = date;
	}
	static fromJson(json) {
		const name = json.name;
		const color = json.color;
		const castellers = json.castellers;
		const date = json.date;
		if (name && color && castellers && date)
			return new Colla(name, color, castellers, date);
		throw new Error("L'arxiu no conté cap partida.");
	}
	addCastellers(castellers) {
		this.castellers += castellers;
		return castellers;
	}
	takeCastellers(castellers) {
		let max = this.castellers;
		if (max > castellers) {
			this.castellers = 0;
			return max;
		}
		this.castellers -= castellers;
		return castellers;
	}
}

export default Colla;
