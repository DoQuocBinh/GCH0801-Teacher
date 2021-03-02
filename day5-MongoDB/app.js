var express = require('express')
var app = express()

var MongoClient = require('mongodb').MongoClient;

//var url = 'mongodb://localhost:27017';
var url =  "mongodb+srv://tommy:123456abc@cluster0.lkrga.mongodb.net/test";

var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

var hbs = require('hbs')
app.set('view engine','hbs')

var bodyParser = require("body-parser");

app.get('/',async (req,res)=>{
    let client= await MongoClient.connect(url);
    let dbo = client.db("MyDatabase");
    let results = await dbo.collection("products").find({}).toArray();
    res.render('home',{model:results})
})

var PORT = process.env.PORT || 5000
app.listen(PORT);
console.log("Server is running at " + PORT)