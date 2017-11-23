
const http = require('http');
const cheerio = require('cheerio');

const storage = {};

// 利用node做一个客户端 请求m.baidu.com
http.get('http://www.cnblogs.com/', (response) => {

      var rawContent = '';
      response.on('data', (chunk) => {
            rawContent += chunk.toString();
      });
      response.on('end', () => {
            // 分析操作
            const $ = cheerio.load(rawContent);
            var aLinks = $('.titlelnk');
            aLinks.each((i, item) => {
                  // $(item).attr('href');
                  console.log(item.children[0].data);
                  storage[item.children[0].data] = '';

                  http.get(item.attribs.href, (response) => {
                        
                  });
            });
      });
});
