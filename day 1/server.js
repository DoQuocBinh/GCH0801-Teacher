var http = require('http'); // 1 - Import Node.js core module

var server = http.createServer(function (req, res) {   // 2 - creating server
    if (req.url == '/') { //check the URL of the current request       
        // set response header
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        
        // set response content    
        res.write('<html><body><p>This is home Page.</p>');
        res.write('<a href="/student">Student</a><br>')
        res.write('<a href="/admin">Admin</a>')
        res.write('</body></html>');
        res.end();   
    }
    else if (req.url == "/student") {
        
        res.write('<html><body><p>This is student Page.</p><br>');
        res.write('<a href="/">Home</a><br>')
        res.write('<a href="/admin">Admin</a>')
        res.write('</body></html>');
        res.end();      
    }
    else if (req.url == "/admin") {       
        res.write('<html><body><p>This is admin Page.</p><br>');
        res.write('<a href="/">Home</a><br>')
        res.write('<a href="/student">Student</a>')
        res.write('</body></html>');
        res.end();   
    
    }
    else
        res.end('Invalid Request!');

});

var PORT = process.env.PORT || 5000
server.listen(PORT); //3 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..')
