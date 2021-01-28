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
var  jsonIdAndNote =[];

app.get('/remove',(req,res)=>{
    let id = req.query.id;
    let posRemove=-1;
    for(i=0;i<jsonIdAndNote.length;i++){
        if(jsonIdAndNote[i].id== id){
            posRemove = i;
            break;
        }
    }
    jsonIdAndNote.splice(posRemove,1);
    //update the file content
    let newContent ='';
    for(i=0;i<jsonIdAndNote.length;i++){
        newContent += jsonIdAndNote[i].id + '*' + jsonIdAndNote[i].note + '\n';
    }
    fs.writeFileSync(fileName,newContent,'utf8');
    res.redirect('/list');
})

app.get('/list',(req,res)=>{
    //reset the array to empty
    jsonIdAndNote = []
    let wholeContent = fs.readFileSync(fileName,'utf8');
    let idAndNote = wholeContent.split('\n');
    idAndNote.pop();//remove the last element
     
    for(i=0;i<idAndNote.length;i++){
        let node = {
            id : idAndNote[i].split('*')[0],
            note: idAndNote[i].split('*')[1]
        }
        jsonIdAndNote.push(node);
    }
    console.log(jsonIdAndNote)
    res.render('viewAll',{data: jsonIdAndNote})
    
})
app.post('/doAdd',(req,res)=>{
    //get content from textbox txtNote
    let note = req.body.txtNote;
    if(note == null || note.length==0){
        //res.sendFile(publicDir + '/newNote.html')
        res.render('newNote',{errorMsg: 'Not allowed to be empty!'})
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

