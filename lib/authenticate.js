var db = require("../lib/addressdb.js")(require("../lib/address.json"));
var handlers = require("./handlers.js")(db);
var secret = process.env.JWT_SECRET || "changeme";
var jwt = require("jsonwebtoken");

function verify(token) {

    var decoded = false;
    try {
        decoded = jwt.verify(token, secret);
    } catch (e) {
        decoded = false;
    }
    return decoded;

}

function auth (req, res, cb) {

    cb = cb || handlers.addressLookup;
    var token = req.headers["x-access-token"];
    var decoded = verify(token);
    
    if(!decoded || !decoded.auth) {
        return res.redirect("/401");
    } else {
        return cb(req, res);
    }
}

function fail (req, res) {
    return res("Request denied");
}

module.exports = {
    
    auth: auth,
    verify: verify,
    fail: fail

}
