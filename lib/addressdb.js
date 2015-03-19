function naturalSorter(as, bs){
    var a, b, a1, b1, i= 0, n, L,
        rx=/(\.\d+)|(\d+(\.\d+)?)|([^\d.]+)|(\.\D+)|(\.$)/g;

    if(as === bs) return 0;

    a= as.toLowerCase().match(rx);
    b= bs.toLowerCase().match(rx);
    L= a.length;

    while(i<L){

        if(!b[i]) return 1;
        a1= a[i],
        b1= b[i++];
        if(a1!== b1){

            n= a1-b1;
            if(!isNaN(n)) return n;
            return a1>b1? 1:-1;
        }
    }
    return b[i]? -1:0;
}

module.exports = function addressdb (json) {
    "use strict";

    var that = {};

    if (typeof json !== "object") {
        return that;
    }

    that.search = function search (searchTerm, cb) {

        var expression, results, address, error;
        expression = new RegExp(searchTerm, "i");
    
        results = json.filter(function(item) {
            address = [item.Unit, item.BuildingName, item.BuildingNumber, item.Street,
                item.Town, item.Postcode].join(" ");
            return expression.test(address);
        }).slice(0, 100);

        if (results.length > 0) {
            results.map(function (item) {
                item.title = item.BuildingNumber + " " +
                            item.Street + " " +
                            item.Unit + " " +
                            item.BuildingName + " " +
                            item.Postcode;
            });

            var sortedResults = results.sort(function (obj1, obj2) {
              return naturalSorter(obj1.title, obj2.title);
            })
            return cb(null, sortedResults);
        } else {
            error = new Error();
            error.status = "Search not found";
            error.message = "Sorry, could not find any matches";
            return cb(error);
        }
    }


    return that;
}
