module.exports = function(db) {

    var routes = {

        addressLookup: function addressLookup (req, res, token) {
            db.search(req.params.searchTerm, function(err, data) {
                if (err) {
                    console.log(err);
                    var resp = res("Sorry, could not find any matches")
                        .header("Access-Control-Allow-Origin", "*")
                        .header("Access-Control-Allow-Method", "GET,POST,OPTIONS")
                        .header("Access-Control-Allow-Headers", "X-Access-Token,Origin,Content-type,Accept")
                        .header("Access-Control-Max-Age", "1728000")
                        .header("X-Access-Token", token);

                    console.log(resp);
                    return resp;
                } else {
                    var resp = res(data)
                        .header("Access-Control-Allow-Origin", "*")
                        .header("Access-Control-Allow-Method", "GET,POST,OPTIONS")
                        .header("Access-Control-Allow-Headers", "X-Access-Token,Origin,Content-type,Accept")
                        .header("Access-Control-Max-Age", "1728000")
                        .header("X-Access-Token", token); 

                    console.log(resp);
                    return resp;
                }
            });
        },


    };

    return routes;
}
