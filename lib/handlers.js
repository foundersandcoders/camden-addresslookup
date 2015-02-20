module.exports = function(db) {

    var routes = {

        addressLookup: function addressLookup (req, res, token) {
            db.search(req.params.searchTerm, function(err, data) {
                if (err) {
                    console.log(err);
                    return res("Sorry, could not find any matches")
                        .header("X-Access-Token", token);

                } else {
                    return res(data)
                        .header("X-Access-Token", token); 
                }
            });
        },


    };

    return routes;
}
