const express = require("express");
const hbs = require("hbs");
const app = express();

//Set view engine
app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:false}));

hbs.registerHelper('table',(numb)=>{
    var str = "";

    str += "<table>";
    str += "<tbody>";

    for(let i = 0; i < numb; i++)
    {
        str += "<tr>";
        
        for(let j = 0; j < numb; i++)
        {
            str += CreateCell();
        }

        str += "</tr>";
    }

    str += "</tbody>";
    str += "</table>";

    return new hbs.handlebars.SafeString(str);
})

hbs.registerHelper('error404',(numb)=>{
    var str = "";
    var classes = ["still","rotate","shrink"];

    for(let i = 0; i < numb; i++)
    {
        str += "<div ";

        str += "class=" + classes[Math.floor(Math.random() * classes.length)] + ">";

        str += "404";

        str += "</div>";
    }

    return new hbs.handlebars.SafeString(str);
})

app.get("/index", RandomNumb, (req,res)=>{
    res.render("index.hbs",{number : req.numb});
})

app.get("/*", RandomNumb ,(req,res)=>{
    res.render("error.hbs", {number : req.numb});
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})

function CreateCell()
{
    var color = ((1<<24)*Math.random()|0).toString(16);
    str = "<td style = 'background-color: #" + color + ";'>" + color.toUpperCase() + "<br /><span style = 'color: #ffffff;'>" + color.toUpperCase() + "</span></td>";

    return str;
}

function RandomNumb(req,res,next)
{
    var min = 20;
    var max = 50;

    req.numb = Math.floor(Math.random() * (max - min)) + min;
    next();
}