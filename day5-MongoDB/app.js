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
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/edit', async(req,res)=>{
    let id = req.query.pid;
    var ObjectID = require('mongodb').ObjectID;
    let condition = {"_id":ObjectID(id)}; 
    
    let client= await MongoClient.connect(url);
    let dbo = client.db("MyDatabase");
    let prod = await dbo.collection("products").findOne(condition);
    res.render('edit',{model:prod});

})
app.post('/update',async (req,res)=>{
    let client= await MongoClient.connect(url);
    let dbo = client.db("MyDatabase");
    
    let nameInput = req.body.productName;
    let priceInput = req.body.price;
    let idInput = req.body.pid;

    var ObjectID = require('mongodb').ObjectID;
    let condition = {"_id":ObjectID(idInput)};  

    let updateProduct ={$set : {productName : nameInput, price:priceInput}} ;
    await dbo.collection("products").updateOne(condition,updateProduct);
    res.redirect('/');
})

app.get('/delete',async (req,res)=>{
    let id = req.query.pid;
    var ObjectID = require('mongodb').ObjectID;
    let condition = {"_id":ObjectID(id)};    

    let client= await MongoClient.connect(url);
    let dbo = client.db("MyDatabase");
    
    await dbo.collection("products").deleteOne(condition);
    res.redirect('/');
})

//npm install mongodb
app.get('/',async (req,res)=>{
    let client= await MongoClient.connect(url);
    let dbo = client.db("MyDatabase");
    let results = await dbo.collection("products").find({}).toArray();
    res.render('home',{model:results})
})
app.get('/new',(req,res)=>{
    res.render('newProduct')
})
app.post('/search',async (req,res)=>{
    let searchText = req.body.txtSearch;
    let client= await MongoClient.connect(url);
    let dbo = client.db("MyDatabase");
    let results = await dbo.collection("products").
        find({productName: new RegExp(searchText,'i')}).toArray();
        
    res.render('home',{model:results})
})
app.post('/insert',async (req,res)=>{
    let client= await MongoClient.connect(url);
    let dbo = client.db("MyDatabase");
    let nameInput = req.body.productName;
    let priceInput = req.body.price;
    let newProduct = {productName : nameInput, price:priceInput};
    await dbo.collection("products").insertOne(newProduct);
   
    let results = await dbo.collection("products").find({}).toArray();
    res.render('home',{model:results})
})

var PORT = process.env.PORT || 5000
app.listen(PORT);
console.log("Server is running at " + PORT)