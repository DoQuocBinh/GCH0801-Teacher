var express = require('express')
var hbs = require('hbs')

var app = express()
app.set('view engine','hbs')

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/',(req,res)=>{
    res.render('index')
})


const PORT = process.env.PORT || 5000
app.listen(PORT);
console.log("Server is running at " + PORT)