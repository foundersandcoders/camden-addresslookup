var test = require("tape");
var request = require("request");
var server = require("../server.js");
var jwt = require("jsonwebtoken");
var mockResponse = require("./fixtures/addressresponse.json");

server.start(function() {

    console.log("server started, starting tests...");

    test("server should respond", function(t) {
    
        request("http://0.0.0.0:8081/search/cam", function (err, res, body) {
        
            t.equals(res.statusCode, 200, "status code 200");
            t.end();
        
        });
    
    });

    
    test("server should not respond with data if no token", function(t) {
    
        request("http://0.0.0.0:8081/search/cam", function (err, res, body) {
        
            t.equals(res.statusCode, 200, "status code 200");
            t.equals(body, "Request denied", "error message received");
            t.end();
        
        });
    
    });

    test("server should not respond with data if incorrect token", function(t) {
   
        var opts = {
            headers: {
                "x-access-token": false
            },
            method: "GET",
            uri: "http://0.0.0.0:8081/search/cam"
        };
        request(opts, function (err, res, body) {
        
            t.equals(res.statusCode, 200, "status code 200");
            t.equals(body, "Request denied", "error message received");
            t.end();
        
        });
    
    });

    test("server should respond with data if correct token", function(t) {
  
        var unsigned = {
            auth: "thisGuy"
        };
        var token = jwt.sign(unsigned, "changeme");

        var opts = {
            headers: {
                "x-access-token": token
            },
            method: "GET",
            uri: "http://0.0.0.0:8081/search/50%20highgate%20west"
        };
        request(opts, function (err, res, body) {
        
            t.equals(res.statusCode, 200, "status code 200");
            t.deepEquals(JSON.parse(body), mockResponse, "data received");
            t.end();
            server.stop(); 
        });
    
    });

});

