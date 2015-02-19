var db = require("../lib/addressdb.js")(require("../lib/address.json"));
var handlers = require("./handlers.js")(db);
var secret = process.env.JWT_SECRET || "changeme";

function verify(token) {
    console.log(token); 
    var decoded = false;
    try {
        decoded = jwt.verify(token, secret);
    } catch (e) {
        decoded = false;
    }
    return decoded;

}

module.exports = {
    
    auth:function(req, res, cb) {
        console.log(req.headers);
        var token = req.headers["x-access-token"];
        var decoded = verify(token);
        console.log(decoded);
        if(!decoded || !decoded.auth) {
            return res.redirect("/401");
        } else {
            handlers.addressLookup(req, res, token);
        }

    },

    verify: verify,

    fail: function (req, res) {
        res("Request denied");
    }

}
