import HexToRgb from "../functions/HexToRgb";
import HexToFilter from "../functions/HexToFilter";

class Colla {
	constructor(name,
				color,
				castellers=50
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
	}
	static fromJson(json) {
		const name = json.name;
		const color = json.color;
		const castellers = json.castellers;
		if (name && color && castellers)
			return new Colla(name, color, castellers);
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
