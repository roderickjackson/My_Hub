const bcrypt = require("bcryptjs")
// const sgMail = require('@sendgrid/mail')
// const {SENDGRID_API_KEY} = require('../constants')
// sgMail.setApiKey(SENDGRID_API_KEY)
const {validatePassword, validateUserInput, validateUser} = require('../user_service_modules/userValidation')
const {signToken, signTokenForAccountActivation} = require('../auth_service_module/auth_service')
const {sendMail} = require('../mail_service_module/index')
const {findDocumentByKey} = require('../db_service_modules/db_access')
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
	const {email, firstName, lastName} = ctx.params
	const findUserByEmail = await findDocumentByKey(User, email)
	const token = signTokenForAccountActivation(email, firstName, lastName)
	
	validateUserInput(ctx)
	console.log('past validate')
	console.log('findUserByEmail', findUserByEmail)
	if (findUserByEmail){
		throw new Error("Email already exists")
	}
	
	sendMail(ACCOUNT_ACTIVATION, token, email)
}

/**
 * @route Post /users/register
 * @desc Register user
 * @access Public
 * @ctx = {email, password, firstName, lastName}
 */
exports.createUser = async (ctx) => {
	console.log("REQUEST ---> REQUEST --->", ctx.params)
    validateUserInput(ctx)

    try {
				const {email} = ctx.params
				let userAlreadyExist = await User.findOne({email}).lean()

				if(userAlreadyExist){
					throw new Error("Email already exists")
				}

				// let signedToken = auth.signTokenForActivation(user, email)
				let user = new User(ctx.params)
				await user.save()
    }
    catch (error){
				throw new Error(error)
    }
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
				let user = await User.findOne({email}).lean()
        let isPasswordValid = await bcrypt.compare(password, user.password)
        
        // May need to change the name of this variable to better match what it's doing needs better error handling
        // validateUser(user)
        // validatePassword(isPasswordValid)
        
				let token = signToken(user, email)
				
				console.log('signedToken', signedToken)

				return token
    }
    catch (error){
        throw new Error(error)
    }
}
