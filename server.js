var http = require('http');
var fs = require('fs');
var url = require('url');
const sdk = require('node-appwrite');


const client = new sdk.Client()
    .setEndpoint('http://localhost:8000/v1')
    .setProject('6338c55086feab70507c')
    .setKey('7190acd0a7a6f6f5c9ffe6d11ab04322be1aab35e703f8d523c1ae2e67757e6ad4e054a7ea43e06f2671f6f90501b2335f53fb24e06f29e62710b5211250992a39d336294b6e445ebcdf6516f531e1e86288f247dba6bb5f6c308ef631a81955a6672f6c7d5f5183b57b4fbc828b621cb61fa61dbff8e8e5fec85e103325e0e9');

const databases = new sdk.Databases(client);

const promise = databases.list();

promise.then(function (response) {
    console.log(response);
}, function (error) {
    console.log(error);
});

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
}).listen(9000);
