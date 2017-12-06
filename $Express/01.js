var express = require('express');
var app = express();

app.get('/', (req, res) => { 
      res.send('你大爷的！');
});

app.get('/mystery', (req, res) => {
      res.send('猜猜我是谁');
});

app.listen(3000);