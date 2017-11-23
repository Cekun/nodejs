const http = require('http');

module.exports = (url, callback) => {

  http.get(url, (response) => {
    var rawContent = '';
    response.on('data', (chunk) => {
      rawContent += chunk.toString();
    });
    response.on('end', () => {
      callback(null, rawContent);
    });
    response.on('error', (err) => {
      callback(err);
    })
  });

};