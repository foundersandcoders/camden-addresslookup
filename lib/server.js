/***********************************************
*   SERVER.JS
*
************************************************/

var hapi = require("hapi");
var port = 8081;

var internals = {};

var server = new hapi.Server();

server.connection({
    port: process.env.PORT || port,
    labels: ["address-service"],
    routes: {
        cors: {
            additionalHeaders: ["X-Access-Token"],
            additionalExposedHeaders: ["X-Access-Token"]
        }
    }
});

server.route(require("./routes.js"));

module.exports = server;
