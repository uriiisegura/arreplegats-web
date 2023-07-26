function Normalize(probabilities) {
	const totalProbability = probabilities.reduce((sum, prob) => sum + prob, 0);
	return probabilities.map(prob => prob / totalProbability);
};

export default Normalize;
