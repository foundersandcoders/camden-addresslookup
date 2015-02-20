var authenticate = require("./authenticate.js");

module.exports = [
    {
        method: "GET",
        path: "/search/{searchTerm}",
        handler: authenticate.auth
    },
    {
        method: "GET",
        path: "/401",
        handler: authenticate.fail
    }
];