function ValidateEmail(email) {
	if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))
		return true;
	return false;
};

export default ValidateEmail;
