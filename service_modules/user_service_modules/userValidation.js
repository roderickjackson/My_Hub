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
        email,
        password,
        firstName,
        lastName
    })
 }
 
/**
 * The purpose of the validateIfUserObjIsEmpty function is to validate
 * if there is a user in the database with the same email that was
 * submitted through the login form.
 */
exports.validateIfUserObjIsEmpty = (user) => {
	const obj = createValidationObj(user, EMAIL_VALIDATION_MESSAGE, EMAIL_VALIDATION_CODE)
  validateExistenceOfObject(obj)
}

/**
 * The purpose of the validateIfPasswordObjIsEmpty function is to validate
 * if there is a user in the database with the same password that was
 * submitted through the login form.
 */
exports.validateIfPasswordObjIsEmpty = (password) => {
	const obj = createValidationObj(password, PASSWORD_VALIDATION_MESSAGE, PASSWORD_VALIDATION_CODE)
	validateExistenceOfObject(obj)
}

exports.validateIfUserExists = (user) => {
	if(user){
		throw new Error("Email already exists")
	}
}
