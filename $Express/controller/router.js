var files = require('../models/file.js');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');

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
      files.getAblumByName(albumName, function (err, images) {
            if (err) {
                  next();
                  return;
            }
            res.render('album', {
                  'ablumName': albumName,
                  'images': images
            })
      });
}

exports.showUpload = function (req, res) {
      files.getAllAblum(function (err, allAblum) {
            if (err) {
                  res.send(err);
                  return;
            }
            res.render('up', {
                  'albums': allAblum
            });
      });
}

exports.doPost = function (req, res, next) {
      if (req.url == '/up' && req.method.toLowerCase() == 'post') {
            // parse a file upload 
            var form = new formidable.IncomingForm();
            form.uploadDir = path.normalize(__dirname+'/../tmp');

            form.parse(req, function (err, fields, files) {
                  if(err){
                        next();
                        return;
                  }
                  var fileSize = files.file.size;
                  var oldpath = files.file.path;
                  if(fileSize / 1024 > 1024){
                        res.send('请选择小于1M的图片');
                        fs.unlink(oldpath);
                        return;
                  }
                  var extname = path.extname(files.file.name);
                 
                  var date = new Date();
                  var formatdate = date.getFullYear().toString()
                        +date.getMonth().toString()+date.getDate().toString()
                        +date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString();
                  var folder = fields.folder;
                  var newPath = path.normalize(__dirname + '/../uploads/' + folder + '/' + formatdate + extname);
                  console.log("newPath: "+newPath);
                  fs.rename(oldpath, newPath, (err) => {
                        if(err){
                              res.send('改名失败！');
                              return;
                        }
                  });
                 
            });
            res.end("上传成功！");
      }
      return;
}