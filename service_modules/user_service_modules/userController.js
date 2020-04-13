const bcrypt = require("bcryptjs")
const sgMail = require('@sendgrid/mail')
const {SENDGRID_API_KEY} = require('../constants')
sgMail.setApiKey(SENDGRID_API_KEY)
const v = require('../user_service_modules/userValidation')
const auth = require('../auth_service_module/auth_service')

// Models
const User = require('./userModel')

/**
 * @route Post /users/register
 * @desc Register user
 * @access Public
 * @ctx = {email, password, firstName, lastName}
 */
exports.createUser = async (ctx) => {
	console.log("REQUEST ---> REQUEST --->", ctx.params)
    v.validateUserInput(ctx)

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
        v.validateUser(user)
        v.validatePassword(isPasswordValid)
        
				let signedToken = auth.signToken(user, email)
				
				console.log('signedToken', signedToken)

				return signedToken
    }
    catch (error){
        throw new Error(error)
    }
}
