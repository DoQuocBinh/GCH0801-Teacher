var express = require('express')
var app = express()

var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

var hbs = require('hbs')
app.set('view engine','hbs')

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
var fs = require('fs')
var fileName = 'notes.txt'
app.post('/doAdd',(req,res)=>{
    //get content from textbox txtNote
    let note = req.body.txtNote;
    if(note == null || note.length==0){
        res.sendFile(publicDir + '/newNote.html')
        return;
    }
    //get the current timestamp
    let ts = new Date().getTime();
    //append the content to end of the file notes.txt
    fs.appendFileSync(fileName,ts +'*'+note +'\n','utf8')
    //go to the url '/' which means index.html
    res.redirect('/');
})

app.get('/',(req,res)=>{
    res.sendFile('index.html');
})

app.get('/new',(req,res)=>{
    //res.sendFile(publicDir + '/newNote.html');
    res.render('newNote');
})

var PORT = process.env.PORT || 5000
app.listen(PORT);
console.log("Server is running at " + PORT)

