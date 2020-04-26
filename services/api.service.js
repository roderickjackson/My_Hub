"use strict";

const ApiGateway = require("moleculer-web");

module.exports = {
    name: "api",
    logLevel: "info",
    mixins: [ApiGateway],

    settings: {
        // Global CORS settings for all routes
        cors: true,
        
        port: process.env.PORT || 3002,
        
        routes: [{

            path: "/api",

        whitelist: [
            // Access to any actions in all services under "/api" URL
            "user.*",
            "greeter.*"
            ],

        }],

        // Serve assets from "public" folder
        assets: {
            folder: "public"
        }
    }
};
