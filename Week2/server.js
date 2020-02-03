var express = require("express");
var path = require("path");
var hbs = require("hbs");

var app = express();
app.use(express.urlencoded({extended:false}));

//partials
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

app.get("/index", function(req,res){
    res.render("index.hbs", {junk:"Index Page"});
});

app.get("/form", function(req,res){
    res.render("form.hbs", {junk:"Form Page",stuff:10});
});

app.get("/about", function(req,res){
    res.render("about.hbs", {junk:"About Page"});
});

app.post("/results",(req,res) => {
    console.log(req)
    var name = req.body.first + " " + req.body.last;

    res.render("index.hbs", {junk:name});
});

app.listen(3000, ()=>{console.log("Server running on port 3000")});