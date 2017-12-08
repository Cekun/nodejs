var express = require('express');
var bodyParser = require('body-parser');
var router = require('./controller');
var ejs = require('ejs');
var app = express();

app.use(express.static('./public'));
app.use(express.static('./uploads'));

app.set('view engine','ejs');

app.get('/', router.showIndex);
app.get('/:albumName', router.showAlbum);

//404
app.use((req,res) => {
      res.render('err');
});

app.listen(3000);