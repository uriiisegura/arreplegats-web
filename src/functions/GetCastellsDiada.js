import PopPd from "./PopPd";
import GetClean from "./GetClean";

function GetCastellsDiada(diada) {
	const castells = [];
	const round = [];
	diada.map(castell => round.push(Object.keys(castell)));
	for (let i = Math.min.apply(null, round); i <= Math.max.apply(null, round); i++) {
		const ronda = [];
		diada.forEach(castell => { if (parseInt(Object.keys(castell)) === i) ronda.push(Object.values(castell)[0]); });
		const formated = formatRound(ronda);
		if (formated !== false)
			castells.push(formated);
	}
	return castells;
};

function formatRound(castells) {
	castells = PopPd(castells);	
	if (castells.length < 1) return false;
	switch (castells.length) {
		case 1:
			return castells[0];
		case 2:
			if (castells.includes('3d7') && castells.includes('4d7'))
				return '3i4d7sim';
			break;
		case 3:
			if (castells.includes('Pd5') && countInArray(castells, 'Pd4') === 2)
				return 'Vd5';
			if (castells.includes('Pd5C') && countInArray(castells, 'Pd4') === 2)
				return 'Pd5C+2Pd4';
			if (castells.includes('iPd5') && countInArray(castells, 'Pd4') === 2)
				return 'iPd5+2Pd4';
			if (castells.includes('Pd6f') && countInArray(castells, 'Pd5') === 2)
				return 'Vd6f';
			break;
		default:
	}

	if (allEqual(castells))
		return castells.length + castells[0];
	const cleanCastells = [];
	castells.forEach(castell => cleanCastells.push(GetClean(castell)));
	if (allEqual(cleanCastells)) {
		let count = 0;
		const weird = [];
		castells.forEach((castell, i) => { if (castell === cleanCastells[i]) count += 1; else weird.push(castell) });
		return (count > 1 ? count : '') + cleanCastells[0] + '+' + weird.join('+');
	}
	return castells.join('+');
};

function allEqual(arr) {
	return arr.every(v => v === arr[0]);
};

function countInArray(array, value) {
	let count = 0;
	for (const e of array)
		if (e === value) count += 1;
	return count;
};

export default GetCastellsDiada;
