var fs = require('fs');

exports.getAllAblum = function (callback) {
      fs.readdir('./uploads', (err, files) => {
            if(err){
                  callback("没有找到uploads文件夹", null);
                  return;
            }
            var albums = [];
             //迭代器
            (function iterator(i){
                  if(files.length == i){
                       callback(null, albums);
                       return;
                  }
                  fs.stat('./uploads/' + files[i], (err, stats) =>{
                        if(err){
                              callback("找不到文件", null);
                              return;
                        }
                        if(stats.isDirectory()){
                              albums.push(files[i]);
                        }
                        iterator(i+1);
                  })
            })(0)
      });
/*     //同步方法解决
       var albums = [];
      var files = fs.readdirSync('./uploads');
      for(var i = 0; i < files.length; i++){
            var stats = fs.statSync('./uploads/' + files[i]);
            if(stats.isDirectory()){
                  albums.push(files[i]);
            }
      }
      return albums;
      */
}

exports.getAblumByName = function(albumName, callback){
      fs.readdir('./uploads/' + albumName, (err, files) => {
            if(err){
                  callback("没有就是没有", null);
                  return;
            }
            var images = [];
            (function iterator(i){
                  if(files.length == i){
                        callback(null, images);
                        return;
                  }
                  fs.stat('./uploads/' + albumName+ '/' + files[i], (err, stats) => {
                        if(err){
                              callback(files[i], null);
                              return;
                        }
                        if(stats.isFile()){
                              images.push(files[i]);
                        }
                        i++;
                        iterator(i);
                  })
            })(0)
      });
}