// 客户端

const net = require('net');

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

rl.question('What is your name? ', (name) => {
  name = name.trim();
  if (!name) {
    throw new Error('没名字还出来混。。');
  }
  // 创建于服务端的连接
  var server = net.connect({ port: 2080, host: '127.0.0.1' }, () => {
    console.log(`Welcome ${name} to 2080 chatroom`);
    // 监听服务端发过来的数据
    server.on('data', (chunk) => {
      try {
        var signal = JSON.parse(chunk.toString().trim());
        var procotol = signal.procotol;
        switch (procotol) {
          case 'boardcast':
            console.log('\nboardcast');
            console.log(signal.from + '> ' + signal.message);
            rl.prompt();
            break;
          default:
            server.write('弄啥咧！你要干的我干不了');
            break;
        }
      } catch (error) {
        server.write('弄啥咧！');
      }
    }).on('error', (err) => {
      console.log('断开连接');
    });

    rl.setPrompt(name + '> ');

    rl.prompt();

    rl.on('line', (line) => {

      var input = line.toString().trim();
      if (!input) {
        return false;
      }

      if (input === 'q') {
        server.end();
        process.exit(0);
      }

      var send = {
        procotol: 'boardcast',
        from: name,
        message: input
      };
      server.write(JSON.stringify(send));

      rl.prompt();

    }).on('close', () => {
      console.log('bye bye');
      server.end();
      process.exit(0);
    });

  });
});

