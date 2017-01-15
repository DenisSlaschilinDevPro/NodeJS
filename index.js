let http = require('http');
let request = require('request');
let Picture = require('./picture');

http.createServer((req, resp) => {
    let picture = request(Picture.getRandomUrl());
    req.pipe(picture);
    picture.pipe(resp);
}).listen(3000);

console.log('Node started on http://localhost:3000');
