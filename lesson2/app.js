var express = require('express');
var path = require('path');
var fs = require('fs');
var url = require('url');

var apiVersion = require('./package').version;

var app = express();

app.set('port', 5000);

app.listen(app.get('port'), function() {
    console.log('Node app is running on http://localhost:' + app.get('port') );
});

app.get('/', function (req, res) {
    res.send('<html><body><h1>My web app http API! Version ' + apiVersion + '</h1></body></html>');
});

let getAllData = (srcPath) => {
    let getSubfolders = (dirPath) => {
        return fs.readdirSync(dirPath).filter((file) => {
            return fs.statSync(path.join(dirPath, file)).isDirectory();
        });
    }    

    let allData = [];

    srcPath = srcPath.replace('/' + apiVersion, '');
    srcPath = path.join(__dirname, srcPath);

    getSubfolders(srcPath).forEach((subfolder) => {
        let currentPath = path.join(srcPath, subfolder, 'get.json');
        allData.push(JSON.parse(fs.readFileSync(currentPath)));
     });
 
    return allData;
}

app.get('/api/:apiVersion/posts/', function (req, res) {
    res.type('json');
    res.send(getAllData(req.path));
});

app.get('/api/:apiVersion/users/', function (req, res) {
    res.type('json');
    res.send(getAllData(req.path));
});

app.get('/api/:apiVersion/*', function (req, res) {
    var filePath = req.path + req.method.toLowerCase() + '.json';

    filePath = filePath.replace('/' + apiVersion, '');


    filePath = path.join(__dirname, filePath);

    fs.stat(filePath, function (err) {
        res.type('json');

        if (err) {
            return res.json({ success: false, error: 'no such file' });
        }
        fs.createReadStream(filePath).pipe(res);

    });
});
