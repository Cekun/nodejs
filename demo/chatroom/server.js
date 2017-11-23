// 建立一个Socket服务端

const net = require('net');

// 用于存储所有的连接
var clients = [];

var server = net.createServer((socket) => {

  clients.push(socket);

  console.log(`Welcome ${socket.remoteAddress} to 2080 chatroom`);

  function boardcast(signal) {
    console.log(signal);
    // 肯定有用户名和消息
    var username = signal.from;
    var message = signal.message;
    // 我们要发给客户端的东西
    var send = {
      procotol: signal.procotol,
      from: username,
      message: message
    };
    // 广播消息
    clients.forEach(client => {
      client.write(JSON.stringify(send));
    });
  }

  // 有任何客户端发消息都会触发
  socket.on('data', (chunk) => {
    try {
      var signal = JSON.parse(chunk.toString().trim());
      var procotol = signal.procotol;
      switch (procotol) {
        case 'boardcast':
          boardcast(signal);
          break;
        // case 'p2p':
        //   p2p(signal);
        //   break;
        // case 'shake':
        //   shake(signal);
        //   break;
        default:
          socket.write('弄啥咧！你要干的我干不了');
          break;
      }
    } catch (error) {
      socket.write('弄啥咧！');
    }
  }).on('error', (err) => {
    clients = clients.splice(clients.indexOf(socket), 1)
    console.log(`error ${socket.remoteAddress}`);
  }).on('end', () => {
    clients = clients.splice(clients.indexOf(socket), 1)
    console.log(`${socket.remoteAddress} offline`);
  });

});


var port = 2080;
server.listen(port, (err) => {
  if (err) {
    console.log('端口被占用');
    return false;
  }
  console.log(`服务端正常启动监听【${port}】端口`);
});


