var db = require("../lib/addressdb.js")(require("../lib/address.json"));
var handlers = require("./handlers.js")(db);

module.exports = [
    {
        method: "GET",
        path: "/search/{searchTerm}",
        handler: handlers.addressLookup
    }
];
