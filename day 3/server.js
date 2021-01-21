var http= require('http');
var fs = require('fs')

var server = http.createServer(function (req, res) { 
    //res.write('hello world')
    let content = fs.readFileSync('data.txt','utf8');
    let words = content.split('\n');
    res.write('<html><body>');
    res.write('<ul>');
    for(i=0;i<words.length;i++){
        res.write('<li>' + words[i] + '</li>');
    }
    res.write('</ul>');
    res.write('</body></html>')
    res.end();
}
)

var PORT = process.env.PORT || 5000
server.listen(PORT); //3 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..')