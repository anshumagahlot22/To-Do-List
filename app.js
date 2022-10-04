const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


const { urlencoded } = require("body-parser");

const app = express();
const items=["Buy Food","Cook Food","Eat Food"];
var workItems=[];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/", function (req, res) {
    let day=date.getDate();
    res.render("list",{listTitle:day,newListItems:items});
});

app.post("/",function(req,res){
    
    var item=req.body.newitem;

    if(req.body.list == "Work List")
    {
        workItems.push(item);
        res.redirect("/work");
    }
    else
    {
    items.push(item);
    res.redirect("/");
    }
})


app.get("/work",function(req,res){
    res.render("list",{listTitle : "Work List",newListItems:workItems});
})

app.post("/work",function(req,res)
{
    var item=req.body.newitem;
    workItems.push(item);
    res.redirect("/work");
})

app.get("/about",function(req,res){
    res.render("about");
})
app.listen("3000", function () {
    console.log("Server has successfully been started at port 3000");
});
