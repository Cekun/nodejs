var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine','ejs');

app.get('/', (req, res) => {
      res.render('form'); // form.ejs 渲染页面
});

var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(urlencodedParser);

app.post('/', urlencodedParser, function (req, res) {
      if (!req.body) 
            return res.sendStatus(400);
      console.log( req.body);
      res.send('welcome, ' + req.body.name);
});
app.listen(3000);