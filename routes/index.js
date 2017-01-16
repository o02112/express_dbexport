var express = require('express');
var Router = express.Router();
var session = require('express-session');

Router.get('/', function(req, res){
    res.render('index')
})

Router.get('/dashboard', function(req, res){
    res.render('template-parts/dashboard')
})

Router.post('/getLoginStatus', function(req, res){
    var sess = req.session;
    if(sess.isLogin){
        res.json({code: '1', message: '已登录。'})
    } else {
        res.json({code: '0', message: '未登录。'})
    }
})

module.exports = Router;