const Validator = require('validator')
const isEmpty = require("is-empty")

module.exports = function validateRegisterInput(data) {
	let errors = {}

	//Ensuring if field is empty, its string. Validator needs strings.
	data.name = !isEmpty(data.name) ? data.name: ""
	data.email = !isEmpty(data.email) ? data.email: ""
	data.password = !isEmpty(data.password) ? data.password: ""
	data.passwordAgain = !isEmpty(data.passwordAgain) ? data.passwordAgain: ""

	if (Validator.isEmpty(data.name)) {
		errors.name = "Name field is required"
	}

	if (Validator.isEmpty(data.email)){
		errors.email = "Email field is required"
	}
	else if (!Validator.isEmail(data.email)){
		errors.email = "Please enter a valid email"
	}
	
	if (Validator.isEmpty(data.password)){
		errors.password = "Password field requried"
	}
	else if (!Validator.isLength(data.password, {min: 6, max: 30})) {
    	errors.password = "Password must be at least 6 characters";
  	}
	if (Validator.isEmpty(data.passwordAgain)){
		errors.passwordAgain = "Please re-enter your password"
	}
	else if (!Validator.equals(data.password, data.passwordAgain)){
		errors.passwordAgain = "Passwords do not match"
	}
	return {
		errors, 
		isValid: isEmpty(errors)
	}
}