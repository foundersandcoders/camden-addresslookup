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
        cors: true
    }
});

server.route(require("./lib/routes.js"));

//don't start if testing
if(!module.parent) {
    server.start(function(err) {
        if (err) {
            throw err;
        } else {
            console.log("Server running");
        }
    });
}

module.exports = server;
