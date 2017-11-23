var dns = require('dns');

dns.lookup('wedn.net', (err, add) => {

console.log(add);  
});