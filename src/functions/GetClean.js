function GetClean(castell) {
	if (castell.includes('id')) return castell.replace('id', '');
	if (castell.includes('i')) return castell.replace('i', '');
	if (castell.includes('C')) return castell.replace('C', '');
	return castell;
};

export default GetClean;
