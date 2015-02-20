var authenticate = require("./authenticate.js");

module.exports = [
    {
        method: "GET",
        path: "/search/{searchTerm}",
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['X-Access-Token'],
                additionalExposedHeaders: ['X-Access-Token']
            }
        },
        handler: authenticate.auth
    },
    {
        method: "GET",
        path: "/401",
        handler: authenticate.fail
    }
];