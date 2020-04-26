const jwt = require('jsonwebtoken')
const {TOKEN_SECRET_OR_KEY, JWT_EXPIRATION, JWT_ACCOUNT_ACTIVATION} = require('../constants')


exports.signToken = (user, email) => {
    const {_id} = user

    return jwt.sign(
			{id: _id, email}, 
			TOKEN_SECRET_OR_KEY, 
			{expiresIn:JWT_EXPIRATION}
		)
}

exports.signTokenForAccountActivation = (email, password, firstName, lastName) => {
    return jwt.sign(
			{email, password, firstName, lastName}, 
			JWT_ACCOUNT_ACTIVATION, 
			{expiresIn: JWT_EXPIRATION}
		)
}

exports.verifyToken = (token) => {
	if(token){
		jwt.verify(token, JWT_ACCOUNT_ACTIVATION, (error, decoded) => {
			if(error){
				console.log('JWT VERIFY IN ACCOUNT ACTIVATION', error)
				throw new Error(`Expired link. Signup agian`)
			}
		})
	}
}

exports.decodeToken = (token) => jwt.decode(token)
