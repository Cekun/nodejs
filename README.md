#Node服务器端开发

> HTTP协议，http、url、querystring、模块、网络爬虫，创建文件服务器

--NodeJs特点：
     1.单线程          2.非阻塞             3事件驱动

      + 1.单线程
          > *nodejs不为每个客户连接创建一个新的线程，而仅仅使用一个新的线程。当有客户连接了，  
      就触发一个内部事件，通过非租塞I/O、事件驱动机制，让nodejs程序宏观上也是并行的
            单线程的好处，操作系统不再有线程创建、销毁的时间开销
            坏处就是一个用户的崩溃会造成别个用户崩溃*

      + 2.非阻塞I/O
          > * 由于nodejs中采用非阻塞I/O机制，因此在执行了访问数据库的代码之后，将立即转而执行之后的代码，把数据库返回结果的处理代码放在回调函数中，  
      从而提高了程序的执行效率 *    

      + 3.事件驱动
            > 在Node中，在一个时刻只能执行一个事件回调函数，但是在执行一个事件回调的中途，可以转而处理其他事件（比如，又有新的用户连接了）  
      然后返回执行原事件的回调函数，这种处理机制，称之为“事件环”


## Socket

## 收发有格式的数据


## HTTP

      `var http = require(http);
      const server = http.createServer((req, res) => {
            res.end();
      });
    
      server.listen(8000);
      `

## Node中与HTTP相关的模块



## 网络爬虫爬取页面内容