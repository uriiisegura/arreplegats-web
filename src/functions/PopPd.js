function PopPd(castells) {
	const noPd = [];
	castells.forEach(castell => { if (castell.indexOf('pd') === -1) noPd.push(castell); });
	return noPd;
};

export default PopPd;
