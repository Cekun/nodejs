#Node服务器端开发

> HTTP协议，http、url、querystring、模块、网络爬虫，创建文件服务器

--NodeJs特点：
     1.单线程          2.非阻塞             3事件驱动

1.单线程
nodejs不为每个客户连接创建一个新的线程，而仅仅使用一个新的线程。当有客户连接了，  就触发一个内部事件，通过非租塞I/O、事件驱动机制，让nodejs程序宏观上也是并行的单线程的好处，操作系统不再有线程创建、销毁的时间开销坏处就是一个用户的崩溃会造成别个用户崩溃*

2.非阻塞I/O
由于nodejs中采用非阻塞I/O机制，因此在执行了访问数据库的代码之后，将立即转而执行之后的代码，把数据库返回结果的处理代码在`回调函数`中，从而提高了程序的执行效率  

3.事件驱动
在Node中，在一个时刻只能执行一个事件回调函数，但是在执行一个事件回调的中途，可以转而处理其他事件（比如，又有新的用户连了），然后返回执行原事件的回调函数，这种处理机制，称之为**“事件环”**

##模块 Module

* **狭义**的说,每一个JavaScript就是一个模块，而多个javascript文件可以相互require，他们共同实现一个功能，t他们整体对外，又称为一个**广义**的模块

* **nodejs中，一个JavaScript文件中定义的变量，函数，都只在这个文件内部有效**，当需要从此JS文件外部引用这些变量、函数时必须使用**exports**对象进行暴露，使用者要用**require()**引用JS文件,无形之中，增加了一个顶层命名空间

* 可以将一个JavaScript文件中，描述一个类，用`module.exports = 构造函数名`的方式向外暴露一个类。

`require()别的js文件的时候，将执行那个js文件.`

## Socket

## 收发有格式的数据


## HTTP

```javascript
var http = require(http);
var server = http.createServer((req, res) => {
      res.end();
});
    
server.listen(8000);
```

## Node中与HTTP相关的模块

### post
原生写post处理，比较复杂，要写两个监听，，文件上传业务比较难写，所以用地方三模块`formidable`


## 网络爬虫爬取页面内容