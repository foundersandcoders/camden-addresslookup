var test = require("tape");
var addressdb = require("../lib/addressdb.js");

test("addressdb.js should be a function", function(t) {
    t.equals(typeof addressdb, "function", "addressdb is a function");
    t.end();
});

test("addressdb should return an object if passed json", function(t) {
    var db = addressdb({test: "ok"});
    t.equals(typeof db, "object", "returns an object");

    t.test("with a search method", function (st) {
        st.ok(db.search, "search exists");
        st.equals(typeof db.search, "function", "and is a method");
        st.end();
    });

    t.end();
});

test("addressdb should return an empty object if not passed json", function(t) {
    var db = addressdb(false);
    t.equals(typeof db, "object", "returns an object");
    t.deepEquals(db, {}, "returns an empty object");

    t.end();
});

test("search method should pass err to cb if unsuccessful", function(t) {
    
    var db = addressdb(["euaoaueaou"]);
    db.search("123", function(err, data) {
        t.notOk(data, "data is empty");
        t.ok(err, "error is populated");
        t.end()
    });

});

test("search method should return array to cb if sucessful", function(t) {
    
    var db = addressdb(require("./mocks/addressesmock.json"));
    db.search("road", function(err, data) {
        t.notOk(err, "error is empty");
        t.ok(data, "data is populated");
        t.equals(typeof data, "object", "data is an array (or object)");
        t.end();
    });

});
