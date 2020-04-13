"use strict";

const ApiGateway = require("moleculer-web");

module.exports = {
	name: "api",
	logLevel: "info",
	mixins: [ApiGateway],

	settings: {
			// Global error handler
			// Global CORS settings for all routes
			cors: true,
			
			port: process.env.PORT || 3002,
			
			routes: [{
				// aliases: {
				// 	"GET custom"(req, res){
				// 		this.logger.info("Logger Working Homie ----->>>>")
				// 	}
				// },
				path: "/api",

				// Route error handler
				// onError(req, res, err) {
				// 	res.setHeader("Content-Type", "application/json; charset=utf-8");
				// 	res.writeHead(500);
				// 	res.end(JSON.stringify(err));
				
				// onError(req, res, err) {
				// 	res.setHeader("Content-Type", "application/json");
				// 	res.writeHead(err.code || 500);
				// 	res.end(JSON.stringify({
				// 			success: false,
				// 			
				// message: err.message
				// 	}));
				// },
			whitelist: [
				// Access to any actions in all services under "/api" URL
				"user.*",
				"greeter.*"
			],

			// authentication: true
		}],

		// Serve assets from "public" folder
		assets: {
			folder: "public"
		}
	}
};
