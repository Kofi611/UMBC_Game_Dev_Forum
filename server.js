var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (req, res) {
    var p = url.parse(req.url, true);
    var filename = "." + p.pathname;
    if (p.pathname == "/") {
        fs.readFile('home.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    } else {
        fs.readFile(filename, function(err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Foud");
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    }
}).listen(8000);
