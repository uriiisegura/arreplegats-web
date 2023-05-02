function ToAmerican(european) {
	const [d,m,y] = european.split('/');
	return y+"-"+m+"-"+d;
};

export default ToAmerican;
