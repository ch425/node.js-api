const express = require('express');
const bodyParser = require('body-parser')
const handleDB = require('./mysql.js');

// 加载fs模块
fs = require('fs');
const app = express();

//配置body-parser中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.post('/login', function (req, res) {
  console.log('参数',req.body)
  handleDB.queryUser(req.body).then(data=>{
	  res.send(data);
  })
});

app.get('/queryUser', function(req, res){
  console.log(req.body)
  handleDB.queryUser(req.body).then(data=>{
	  res.send(data);
  })
})


app.post('/register', function (req, res) {
  console.log('参数',req.body)
  handleDB.insertUser(req.body).then(data=>{
    res.send(data);
  })
});

const server = app.listen(8082, function () {
  console.log('Express app server listening on port %d', server.address().port);
});