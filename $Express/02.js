var express = require('express');
var app = express();
//使用的模板引擎
app.set('view engine','ejs');

app.get('/', (req, res) => {
      res.render('form'); // form.ejs 渲染页面
});

app.post('/', (req, res) => {
      res.send('success!');
});

app.listen(3000);