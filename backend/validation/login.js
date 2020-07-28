const Validator = require('validator')
const isEmpty = require("is-empty")

module.exports = function validateLoginInput(data) {
	let errors = {}

	data.email = !isEmpty(date.email) ? data.email: ""
	data.password = !isEmpty(date.password) ? data.password: ""


	if (Validator.isEmpty(data.email)){
		errors.email = "Email field is required"
	}
	else if (!Validator.isEmail(data.email)){
		errors.email = "Please enter a valid email"
	}

	if (Validator.isEmpty(data.password)){
		errors.password = "Password field requried"
	}

	return {
		errors, 
		isValid: isEmpty(errors)
	}
}