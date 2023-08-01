function TimestampToString (timestamp) {
	return new Date(timestamp).toLocaleDateString('ca-CA', { weekday: 'long', month: 'long', day: 'numeric' });
};

export default TimestampToString;
