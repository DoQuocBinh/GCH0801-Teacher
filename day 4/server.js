var express = require('express')
var app = express()

var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

app.get('/',(req,res)=>{
    res.sendFile('index.html');
})

var PORT = process.env.PORT || 5000
app.listen(PORT);
console.log("Server is running at " + PORT)

