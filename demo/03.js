
const net = require('net');

var socket = net.connect({ port: 80, host: 'm.baidu.com' }, () => {
  socket.on('data', (chunk) => {
    console.log(chunk.toString());
  });

  socket.write(`GET / HTTP/1.1
Accept: text/html
Host:m.baidu.com


  `);
  
});




// if (true) {
//   let a = 10;
// }
// console.log(a);