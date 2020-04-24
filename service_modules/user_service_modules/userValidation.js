const {validateAgainstSchema, validateExistenceOfObject, createValidationObj} = require('../validation_service_module/validations')

const EMAIL_VALIDATION_MESSAGE = 'A user with this email could not be found'

const PASSWORD_VALIDATION_MESSAGE = 'A user with this password could not be found'

const EMAIL_VALIDATION_CODE = 422

const PASSWORD_VALIDATION_CODE = 201

const userValidataionSchema = {
		email: {type: "email"},
		password: {type: "string", min: 4},
		firstName: {type: "string", min: 2},
		lastName: {type: "string", min: 2}
 }
 
 /**
	* Validating the following user inputs: 
	* @Email
	* @Password
	* @First_Name
	* @Last_Name
	*/
	exports.validateUserInput = (data) => {
		const validateAgainstUserSchema = validateAgainstSchema(userValidataionSchema)
    const {email, password, firstName, lastName} = data.params

    return validateAgainstUserSchema({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })
 }
 
/**
 * Validate if there is a user with this email
 */
exports.validateUser = (user) => {
	const obj = createValidationObj(user, EMAIL_VALIDATION_MESSAGE, EMAIL_VALIDATION_CODE)
  validateExistenceOfObject(obj)
}

/**
 * Validate if password is correct
 */
exports.validatePassword = (password) => {
	const obj = createValidationObj(password, PASSWORD_VALIDATION_MESSAGE, PASSWORD_VALIDATION_CODE)
	validateExistenceOfObject(obj)
}
