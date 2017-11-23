const fetch = require('./fetch');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const savePath = path.join(__dirname, 'posts');

if (!fs.existsSync(savePath))
  fs.mkdirSync(savePath);

// const storage = {};

// 利用node做一个客户端 请求m.baidu.com
fetch('http://www.cnblogs.com/', (err, content) => {

  // console.log(content);

  const $ = cheerio.load(content);
  var aLinks = $('.titlelnk');
  var taskCount = aLinks.length;
  aLinks.each((i, item) => {

    fetch(item.attribs.href, (err, content) => {
      taskCount--;

      const $$ = cheerio.load(content);
      var body = $$('#cnblogs_post_body').html();
      var filename = item.children[0].data.replace('/', '-').replace('\\', '-') + '.html';
      fs.writeFile(path.join(savePath, filename), body);
      // storage[item.children[0].data] = body;
      // if (!taskCount) {
      //   // 当前是最后一次任务
      //   console.log(storage);
      // }
    });
  });

});
