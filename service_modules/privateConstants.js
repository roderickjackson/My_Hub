const env = require('../service_modules/env')

const DBCONNECTION = env.DBCONNECTION

const TOKEN_SECRET_OR_KEY= env.TOKEN_SECRET_OR_KEY

const JWT_EXPIRATION  = env.JWT_EXPIRATION

module.exports = {DBCONNECTION, TOKEN_SECRET_OR_KEY, JWT_EXPIRATION}