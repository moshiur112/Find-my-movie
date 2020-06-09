var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs")


app.get("/", function(req, res) {
    res.render("search");
})


app.get("/results", function(req, res) {
    var moviename ="";
    var year =""
    var type =""
    moviename = req.query.movie;
    year = req.query.year;
    type = req.query.type;


    request("http://www.omdbapi.com/?s=" + moviename+ "&y="+year+"&type="+type+"&apikey=thewdb", function(error, response, body) {

    
        if(!error && response.statusCode == 200) {

            if(body.includes("Movie not found!")) {
                res.send("Something like that does not exist!");
                return;
            }

            var data = JSON.parse(body);

            res.render("results", {data: data})
        } else {


        }
    });


});






app.listen(3000, function() {
    console.log("movie app started");
})
