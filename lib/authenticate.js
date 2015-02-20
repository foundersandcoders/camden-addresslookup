var db = require("../lib/addressdb.js")(require("../lib/address.json"));
var handlers = require("./handlers.js")(db);
var secret = process.env.JWT_SECRET || "changeme";

function verify(token) {
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
        var token = req.headers["X-Access-Token"];
        var decoded = verify(token);

        // res.header("Access-Control-Allow-Origin", "*")
        //     .header("Access-Control-Allow-Method", "GET,POST,OPTIONS")
        //     .header("Access-Control-Allow-Headers", "X-Access-Token,Origin,Content-type,Accept")
        //     .header("Access-Control-Max-Age", "1728000")
        //     .header("X-Access-Token", token);

        if(!decoded || !decoded.auth) {
            return res.redirect("/401");
        } else {
            handlers.addressLookup(req, res, token);

            console.log("handlers" + handlers.addressLookup(req, res, token));
        }

    },

    verify: verify,

    fail: function (req, res) {
        console.log(req.headers)
        res("Request denied");
    }

}
