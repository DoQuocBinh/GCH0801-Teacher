var http= require('http');
var fs = require('fs')
var qs = require('querystring')


var server = http.createServer(function (req, res) { 
    if (req.url == '/')
    {
        let content = fs.readFileSync('data.txt','utf8');
        let words = content.split('\n');
        res.write('<html><body>');
        res.write('<ul>');
        for(i=0;i<words.length;i++){
            res.write('<li>' + words[i] + '</li>');
        }
        res.write('</ul>');
        res.write('<a href="/new">New item</a>')
        res.write('</body></html>')
        res.end()
    }else if(req.url=='/new'){
        res.write('<html><body>');
        res.write('<form  action="/saveItem" method="post">')
        res.write('Item <input type="input" name="txtName"/>')
        res.write('<input type="submit" value="Save"/>')
        res.write('</form>')
        res.write('<br><a href="/">Home</a>')
        res.write('</body></html>')
        res.end();
    }else if(req.url== '/saveItem'){
        let body = '';
        req.on("data",function(chunk){
            body += chunk;
        })    
        req.on('end',function(){
             let item = qs.parse(body).txtName;
             res.write('you are saving: ' +item);
             //save item to file
             fs.appendFileSync('data.txt','\n'+ item ,'utf8')
             //res.setHeader('Location','/');
             return res.end()
        })
    }
}
)
var PORT = process.env.PORT || 5000
server.listen(PORT); //3 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..')