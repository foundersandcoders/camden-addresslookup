var test = require("tape");
var handlers = require("../lib/handlers.js")();

var db, res, req;

test("handlers should contain an object", function(t) {

    t.equals(typeof handlers, "object", "handlers is a function");
    t.end();

});

test("handlers should have an addressLookup method", function(t) {

    t.ok(handlers.addressLookup, "handlers.addressLookup exists");
    t.equals(typeof handlers.addressLookup, "function", "addressLookup is a method");
    t.end();

});

test("addressLookup should respond with error message if err", function(t) {

    db = {
        search: function(term, cb) {
            return cb("ERROR");
        }
    };
    handlers = require("../lib/handlers.js")(db);
    req = {
        params: {
            searchTerm: "Hello"
        }
    };
    res = function(response) {
        t.ok(response, "error passed to res");
    }
    handlers.addressLookup(req, res);
    t.end();

});

test("addressLookup should respond with data if no err", function(t) {

    db = {
        search: function(term, cb) {
            return cb(null, "successful data");
        }
    };
    handlers = require("../lib/handlers.js")(db);
    req = {
        params: {
            searchTerm: "Hello"
        }
    };
    res = function(response) {
        t.ok(response, "data passed to res");
    }
    handlers.addressLookup(req, res);
    t.end();

});
