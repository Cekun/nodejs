var files = require('../models/file.js');

exports.showIndex = function (req, res) {
      /*
       res.render('index', {
             'albums': files.getAllAblum()
       });
       */
      //nodejs的编程思维，就是所有的东西都是异步的，所以内层函数，不是return回来的东西，而是调用高层函数提供的
      //回调函数。把数据当作回调函数的参数来使用。
      files.getAllAblum(function (err, allAblum) {
            if (err) {
                  res.send(err);
                  return;
            }
            res.render('index', {
                  'albums': allAblum
            });
      });
}

exports.showAlbum = function (req, res, next) {
      var albumName = req.params.albumName;
      console.log('albumName1 ' + albumName.toString() );
      files.getAblumByName(albumName, function(err, images){
            if(err){
                next();
                return;
            }
            res.render('album', {
                  'ablumName': albumName,
                  'images': images
            })
      });
    
}