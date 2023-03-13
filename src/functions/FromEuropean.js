function FromEuropean(dateString, regex = '/') {
	const [day, month, year] = dateString.split(regex);
	return new Date(`${month}/${day}/${year}`);
};

export default FromEuropean;
