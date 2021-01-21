var express = require('express')

var app = express()

var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

app.get('/',(req,res)=>{
    res.write('<html><body>');
    res.write('<h1>Hello </h1>')
    res.write('</body></html>')
    res.end()
})
app.get('/student',(req,res)=>{
    res.write('<html><body>');
    res.write('<h1>Student Page </h1>')
    res.write('</body></html>')
    res.end()
})
app.get('/register',(req,res)=>{
    res.sendFile(__dirname +  '/public/register.html');
})

var PORT = process.env.PORT || 5000
app.listen(PORT);
console.log("Server is running at " + PORT)
