function Delay (ms = 1000) {
	return new Promise(res => setTimeout(res, ms));
};

export default Delay;
