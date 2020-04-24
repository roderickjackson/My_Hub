const Validator = require('fastest-validator')

const validator = new Validator()

const validateAgainstSchema = (validationSchema) => validator.compile(validationSchema)

const createValidationObj = (param, message, code) => ({
	obj: param,
	message: message,
	code: code
})

const validate = validationObj => {
	const {obj, message, code} = validationObj
	const error = new Error(message)
	
	if(!validationObj){
			error.statusCode = code
			 throw error
	}
	else{
			return obj
	}
}

const validateExistenceOfObject = validationObj => validate(validationObj)

module.exports = {validateAgainstSchema, createValidationObj, validateExistenceOfObject}