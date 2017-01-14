let http = require('http');
let request = require('request');

http.createServer((req, resp) => {
  let x = request('https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png');
  req.pipe(x);
  x.pipe(resp);
}).listen(3000);

console.log('Node started on http://localhost:3000');


