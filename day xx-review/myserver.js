var express = require('express')
var hbs = require('hbs')

var app = express()
app.set('view engine','hbs')

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }))
var url =  "mongodb+srv://tommy:123456abc@cluster0.lkrga.mongodb.net/test";

app.get('/', async (req,res)=>{
    let client= await MongoClient.connect(url);
    let dbo = client.db("MyDatabase");
    let results = await dbo.collection("products").find({}).toArray();
    res.render('index',{model:results})
})


const PORT = process.env.PORT || 5000
app.listen(PORT);
console.log("Server is running at " + PORT)