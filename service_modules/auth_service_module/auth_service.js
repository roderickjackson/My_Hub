const jwt = require('jsonwebtoken')
// const config = require('../config_service_module/config_service')
const {TOKEN_SECRET_OR_KEY, JWT_EXPIRATION, JWT_ACCOUNT_ACTIVATION} = require('../constants')


exports.signToken = (user, email) => {

    let {_id} = user

    return jwt.sign(
			{id: _id, email}, 
			TOKEN_SECRET_OR_KEY, 
			{expiresIn:JWT_EXPIRATION}
		)
}

exports.signTokenForActivation = (user, email) => {

    let {_id} = user

    return jwt.sign(
			{id: _id, email}, 
			JWT_ACCOUNT_ACTIVATION, 
			{expiresIn: JWT_EXPIRATION}
		)
}
