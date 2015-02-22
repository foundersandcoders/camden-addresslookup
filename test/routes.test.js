var test = require("tape");
var routes = require("../lib/routes.js");

routes.map(function(r) {

    test([r.method, r.path, "should have method, path and handler"].join(" "), function(t) {
    
        t.ok(r.hasOwnProperty("method"), "has method");
        t.ok(r.hasOwnProperty("path"), "has path");
        t.ok(r.hasOwnProperty("handler"), "has handler");
        t.end();
    });


});
