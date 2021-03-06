module.exports = function(db) {

    var routes = {

        addressLookup: function addressLookup (req, res) {
            db.search(req.params.searchTerm, function(err, data) {
                if (err) {
                    return res("Sorry, could not find any matches");
                } else {
                    return res(data);
                }
            });
        },
    };

    return routes;
}
