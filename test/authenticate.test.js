var test = require("tape");
var authenticate = require("../lib/authenticate.js");
var jwt = require("jsonwebtoken");

test("authenticate should exist", function(t) {

    t.ok(authenticate, "authenticate exists");
    t.equals(typeof authenticate, "object", "authenticate is an object");
    t.end();

});

test("authenticate should have the following properties:", function(t) {

    t.ok(authenticate.auth, "authenticate.auth exists");
    t.equals(typeof authenticate.auth, "function", "and is a function");

    t.ok(authenticate.verify, "authenticate.verify exists");
    t.equals(typeof authenticate.verify, "function", "and is a function");
    
    t.ok(authenticate.fail, "authenticate.fail exists");
    t.equals(typeof authenticate.fail, "function", "and is a function");

    t.end();
});

test("verify should return false if using wrong key", function(t) {

    var token = jwt.sign({
        test: true
    }, "locked");
    
    t.notEquals(typeof authenticate.verify(token), "undefined", "verify returns something"); 
    t.equals(authenticate.verify(token), false, "verify returns false");

    t.end();

});

test("verify should return false if passed wrong token", function(t) {

    var token = jwt.sign({
        test: true
    }, "locked");
   
    token = token.substr(0, token.length/2);

    t.notEquals(typeof authenticate.verify(token), "undefined", "verify returns something"); 
    t.equals(authenticate.verify(token), false, "verify returns false");

    t.end();

});

test("verify should return object if using correct key and token", function(t) {

    var unsigned = {
        test: true
    };

    var token = jwt.sign(unsigned, "changeme");
   
    var decoded = authenticate.verify(token);
    t.notEquals(typeof decoded, "undefined", "verify returns something"); 
    t.deepEquals(decoded, unsigned, "verify returns original object");
    t.ok(decoded.hasOwnProperty("test"), "decoded object has same properties");

    t.end();

});

test("auth should redirect to /401 if unverified", function(t) {

    var unsigned = {
        test: true
    };
    var req = {
        headers: {}
    };
    req.headers["x-access-token"] = jwt.sign(unsigned, "locked");
    var res = {
        path: "",
        redirect: function(redirectTo) {
            this.path = redirectTo;
        }
    }
    
    t.equals(res.path, "", "current path is undefined");
    authenticate.auth(req, res);
    t.equals(res.path, "/401", "path has been changed to /401");

    t.end();

});


test("auth should call cb if verified", function(t) {

    t.plan(1);
    var unsigned = {
        test: true,
        auth: "thisGuy"
    };
    var req = {
        headers: {}
    };
    req.headers["x-access-token"] = jwt.sign(unsigned, "changeme");
    var res = {};
    
    authenticate.auth(req, res, function(req, res) {
        t.pass("verified and cb called");
    });

});

test("fail should display 'Request denied'", function(t) {

    var test = "";
    var res = function(value) {
        test = value;
    }
    
    authenticate.fail(null, res);

    t.equals(test, "Request denied", "res passed 'Request denied'");

    t.end();

});
