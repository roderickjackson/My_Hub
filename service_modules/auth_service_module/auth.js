const jwt = require('jsonwebtoken')
const config = require('../config_service_module/config_service')


exports.signToken = (user, email) => {

    let {_id} = user

    return jwt.sign(
			{id: _id, email}, 
			config.secertOrKey, 
			{expiresIn: config.jwtExpiration}
		)
}

// exports.verifyToken = 