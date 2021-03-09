//npm init
//npm install express hbs mongodb express-session

var express = require('express')
var hbs = require('hbs')

const session = require('express-session');

var app = express()
app.set('view engine','hbs')

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }))
var url =  "mongodb+srv://tommy:123456abc@cluster0.lkrga.mongodb.net/test";
var MongoClient = require('mongodb').MongoClient;

app.use(session({secret: 'matkhaukhongaibiet_khongcannho',saveUninitialized: true,resave: true}));

app.post('/doLogin',(req,res)=>{
    let nameInput = req.body.txtName;
    let passInput = req.body.txtPassword;
    if(nameInput != 'admin' || passInput !='admin'){
        res.render('login',{errorMsg: "Username va mat khau incorrect!"})
    }else{
        //save user name to session befor login successfully!
       myses = req.session;
       myses.userName = nameInput;
       res.redirect('/')
    }
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/', async (req,res)=>{
    //check session userName if exited
    myses = req.session;
    if(myses.userName !=null){   
        let client= await MongoClient.connect(url, {useUnifiedTopology: true});
        let dbo = client.db("MyDatabase");
        let results = await dbo.collection("products").find({}).toArray();
        res.render('index',{model:results,userName:myses.userName})
    }else{
        res.render('login')
    }
})


const PORT = process.env.PORT || 5000
app.listen(PORT);
console.log("Server is running at " + PORT)