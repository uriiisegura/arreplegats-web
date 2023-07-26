async function Delay (ms = 1000) {
	await new Promise(res => setTimeout(res, ms));
};

export default Delay;
