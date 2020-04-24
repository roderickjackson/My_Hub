"use strict";
const { signupUser,createUser, retriveUserToken} = require('../service_modules/user_service_modules/userController')
const databaseConnection = require('../service_modules/db_service_modules/db_connection')

databaseConnection()
/**
 * user service
 */
module.exports = {

	name: "user",

	/**
	 * Service settings
	 */
	settings: {

	},

	/**
	 * Service metadata
	 */
	metadata: {

	},

	/**
	 * Service dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
		/**
		* Test action
		*/
		test(ctx) {
			console.log("Console Logging here -->", ctx.params)
			return `${ctx.params}, John`;
		},

		/**
		 * @route Post /user/register
		 * @desc Register user
		 * @access Public
		 * @ctx = {email, password, firstName, lastName}
		 */
		register(ctx){
			// signupUser(findUserByEmail, validate, sendSignupEmail, ctx)
			return createUser(ctx)
		},

		/**
		 * @route Post /user/signup
		 * @desc Signup user
		 * @access Public
		 * @ctx = {email, password, firstName, lastName}
		 */
		signup(ctx){
			// signupUser(findUserByEmail, validate, sendSignupEmail, ctx)
			return signupUser(ctx)
		},

		/**
		 * @route Get /user/login
		 * @desc Login user
		 * @access Public
		 * @ctx = {email, password}
		 */
		login(ctx){
			return retriveUserToken(ctx)
		}
	},

	/**
	 * Events
	 */
	events: {
		"some.thing"(payload) {
			this.logger.info("Something happened", payload);
		}
	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	stopped() {

	}
};
