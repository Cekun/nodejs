
// 模仿Apache编写一个静态服务器
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

http.createServer((req, res) => {
      var pathname = url.parse(req.url).pathname;
      if (pathname == '/') {
            pathname = 'index.html';
      }
      var extname = path.extname(pathname);
      fs.readFile('./static/' + pathname, (err, data) => {
            if (err) {
                  fs.readFile('./static/404.html', (err, data) => {
                        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                        res.end(data);
                  });
                  return;
            }
            getMime(extname, function (mime) {
                  res.writeHead(200, { 'Content-Type': mime });
                  res.end(data);
            });
      });
}).listen(3000);

function getMime(extname, callback) {
      fs.readFile('./mime.json', (err, data) => {
            if (err) {
                  console.log(err);
            }
            var json = JSON.parse(data); 
            //执行回调函数
            var mime = json[extname] || 'text/plain';
            callback(mime);
      });
}