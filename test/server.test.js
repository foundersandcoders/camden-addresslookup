var test = require("tape");
var server = require("../server.js");
var request = require("request");
var baseurl = "http://0.0.0.0:8081"

server.start(function() {
    
    test("server should respond with error to requests to /search/xxx", function(t) {

        request(baseurl + "/search/xxx", function(err, head, body) {
            t.ok(body, "response received");
            t.equals(body, "Sorry, could not find any matches", "error message in body");
            t.end();
        });

    });

   test("server should respond to requests to /search/50%20highgate%20west with data", function(t) {
    
        request(baseurl + "/search/50%20highgate%20west", function(err, head, body) {
            t.ok(body, "response received");
            t.equals(typeof JSON.parse(body), "object", "response is object");
            t.deepEquals(JSON.parse(body), require("./fixtures/addressresponse.json"));
            t.end();
            server.stop();
        });

   }); 

});
