var express = require('express')
var hbs = require('hbs')

var app = express()
app.set('view engine','hbs')

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }))
var url =  "mongodb+srv://tommy:123456abc@cluster0.lkrga.mongodb.net/test";
var MongoClient = require('mongodb').MongoClient;

app.post('/doLogin',(req,res)=>{
    let nameInput = req.body.txtName;
    let passInput = req.body.txtPassword;
    if(nameInput != 'admin' || passInput !='admin'){
        res.render('login',{errorMsg: "Username va mat khau incorrect!"})
    }else{
       res.redirect('/')
    }
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/', async (req,res)=>{
    let client= await MongoClient.connect(url);
    let dbo = client.db("MyDatabase");
    let results = await dbo.collection("products").find({}).toArray();
    res.render('index',{model:results})
})


const PORT = process.env.PORT || 5000
app.listen(PORT);
console.log("Server is running at " + PORT)