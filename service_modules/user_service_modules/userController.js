const bcrypt = require("bcryptjs")
const {validateIfPasswordObjIsEmpty, validateUserInput, validateIfUserObjIsEmpty, validateIfUserExists} = require('../user_service_modules/userValidation')
const {signToken, signTokenForAccountActivation, verifyToken, decodeToken } = require('../auth_service_module/auth_service')
const {sendMail} = require('../mail_service_module/index')
const {findDocumentByKey, saveNewDocument} = require('../db_service_modules/db_access')
const ACCOUNT_ACTIVATION = 'ACCOUNT_ACTIVATION'

// Models
const User = require('./userModel')

 /**
 * @route Post /users/signup
 * @desc Signup user
 * @access Public
 * @ctx = {email, password, firstName, lastName}
 */
exports.signupUser = async (ctx) => {
	const {email, password, firstName, lastName} = ctx.params
	const user = await findDocumentByKey(User, email)
	const token = signTokenForAccountActivation(email, password, firstName, lastName)
	
	validateUserInput(ctx)
	validateIfUserExists(user)
	return	sendMail(ACCOUNT_ACTIVATION, token, email)
}

/**
 * @route Post /users/activateAccount
 * @desc Activate user's account
 * @access Public
 * @ctx = {email, password, firstName, lastName}
 */
exports.activateUserAccount = (ctx) => {
	const {token} = ctx.params

	verifyToken(token)

	const {email, password, firstName, lastName} = decodeToken(token)
	const user = new User({email, password, firstName, lastName})

	saveNewDocument(user) // I need a better error message for this
}

/**
 * @route Get /users/login
 * @desc Login user
 * @access Public
 * @ctx = {email, password}
 */
exports.retriveUserToken = async (ctx) => {
    try {
				const {email, password} = ctx.params
				const user = await findDocumentByKey(User, email)
        const isPasswordValid = await bcrypt.compare(password, user.password)
        
        validateIfUserObjIsEmpty(user)
        validateIfPasswordObjIsEmpty(isPasswordValid)
        
				const token = signToken(user, email)
				
				console.log('signedToken', signedToken)

				return token
    }
    catch (error){
        throw new Error(error)
    }
}
