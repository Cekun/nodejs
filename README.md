# Node服务器端开发

> HTTP协议，http、url、querystring、模块、网络爬虫，创建文件服务器

--NodeJs特点：
     1.单线程          2.非阻塞             3事件驱动

1.单线程
nodejs不为每个客户连接创建一个新的线程，而仅仅使用一个新的线程。当有客户连接了，  就触发一个内部事件，通过非租塞I/O、事件驱动机制，让nodejs程序宏观上也是并行的单线程的好处，操作系统不再有线程创建、销毁的时间开销坏处就是一个用户的崩溃会造成别个用户崩溃*

2.非阻塞I/O
由于nodejs中采用非阻塞I/O机制，因此在执行了访问数据库的代码之后，将立即转而执行之后的代码，把数据库返回结果的处理代码在`回调函数`中，从而提高了程序的执行效率  

3.事件驱动
在Node中，在一个时刻只能执行一个事件回调函数，但是在执行一个事件回调的中途，可以转而处理其他事件（比如，又有新的用户连了），然后返回执行原事件的回调函数，这种处理机制，称之为**事件环**

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
原生写post处理，比较复杂，要写两个监听，文件上传业务比较难写，所以用第三方模块`formidable`。


## 网络爬虫爬取页面内容

## 模板引擎
>后台的模板，著名的有两个，一个是`ejs`，一个是`jade`.

## [Express框架](http://expressjs.com/)
`Express`框架是后台的Node框架
+ 原生Node开发，会有很多问题，比如
      + 呈递静态页面很不方便，需要处理每个HTTP请求，还要考虑304问题
      + 路由处理代码不直观清晰，需要写很多正则表达式和字符串函数
      + 不能集中精力写业务，要考虑写很多其他东西

Express的哲学是在你的想法和服务器之间充当薄薄的一层，这并不意味这它不健壮，或者没有足够有用的特性，而是劲量少干预你，让你充分表达之间的想法，同时提供一些有用的东西。

安装Express `npm install --save express`
--save表示自动添加package.json依赖

### 1. 路由
```javascript
//用get访问一个网址
var express = require('express');
var app = express();
app.get('网址', (req,res) => {});
//用post访问一个网址
app.post('网址', (req,res) => {});

//如果想处理这个网址的任何method的请求，那么写all
app.all('/', (req,res) => {});
```
### 2. 中间件
>路由get， post这些东西就是中间件，中间件讲究顺序
+ 如果在get，post回调函数中，没有next参数，那么就直接匹配第一个路由，不在向下匹配，如果想在往下匹配的话，那么需要写next()
```javascript
app.get('/', (req, res, next) => {
      console.log(1);
      next(); //向下再匹配
});
app.get('/', (req, res) => {
       console.log(2);
});
```
+ 下面两个路由，感觉没有关系：
```javascript
app.get('/:username/:id', (req, res) => {
     res.send('');
});
app.get('/admin/login', (req, res) => {
      res.send('');
}
```
但是实际上冲突了，因为admin可以当做username，login可以当做id。
`How to deal with the problem?`
1. 交换位置。具体的往上写，抽象的往下写。
2. 使用use()中间件

app.use()与get，post不同的是，他的网址不是精确匹配的。而是能有小文件夹匹配的
比如网址：http://127.0.0.1/admin/a/b/c/d
```javascript
app.use('/admin', (req, res) => {
      res.write(req.originalUrl);    //    /admin/a/b/c/d
      res.write(req.baseUrl);        //  /admin
      res.write(req.path);            //     /a/b/c/d
      res.end("Hello");
});
```
+ 大多数情况下，渲染内容用`res.render()`，将会根据`views`中的模板文件进行渲染。[样列](./$Express/02.js)
+ 如果想写一个快速测试页，当然可以使用`res.send()`。这个函数将根据内容自动帮我们设置了`Content-type`头部和`200`状态码。
+ 如果想使用不同的状态码，可以： 
      `res.status(404).send('Sorry, we cannot find that')`
+ ~如果想使用不同的`Content-type`，可以：`res.set('Content-type,'text/html')`~

### 3.Get请求和Post请求的参数
+ Get请求的参数在URL里，在原生Node中，需要使用url模块来识别参数字符串，在Express中，不需要使用url模块了，直接使用`req.query`对象。[样列](./$Express/03.js)
+ Post请求在Express中不能直接获得，需要使用`body-parser`模块，使用后可以使用`req.body`得到参数，但是表单中含有文件上传，那么还是需要使用formidable模块。[样列](./$Express/04.js)