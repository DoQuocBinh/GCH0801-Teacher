var express = require('express')
var hbs = require('hbs')

app.set('view engine','hbs')

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }))



const PORT = process.env.PORT || 5000
app.listen(PORT);
console.log("Server is running at " + PORT)