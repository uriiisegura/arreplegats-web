function GetCastell (castell, parseTorre = true) {
	if (parseTorre)
		castell = castell.replace('Td', '2d');
	if (castell.includes("C"))
		return [castell.slice(0, -1), false];
	return [castell, true];
};

export default GetCastell;
