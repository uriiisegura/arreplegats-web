import HexToRgb from "../functions/HexToRgb";

class Colla {
	constructor(name,
				color,
				castellers=50
		) {
		this.name = name;
		this.color = color;
		const rgb = HexToRgb(color);
		this.highContrast = 0.2126*rgb.r + 0.7152*rgb.g + 0.0722*rgb.b < 128 ? 'white' : 'black';
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
}

export default Colla;
