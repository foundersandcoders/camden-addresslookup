/***********************************************
*   APP.JS
*
************************************************/

require("./lib/server.js").start(function(err){
    
    if (err) {
        return console.log(err);
    } else {
        console.log("server started");
    }
});
