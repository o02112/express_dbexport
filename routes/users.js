var express = require('express');
var Router = express.Router();
var session = require('express-session');
var mysqlPool = require('../modules/mysql_pool');
var utility = require('../modules/utility');

Router.post('/doLogin', function(req, res){
    var username = req.body.username;
    var pass = req.body.password;

    var sql = 'select checked from users where username= ? and password = md5(?)';

    mysqlPool.doquery(sql, [username, pass], function(result){
        if(result.length !== 1) {
            access_log(username, 'f');
            res.json({code: '0', message: '用户名或密码错误，登陆失败。'});
        } else if(result[0].checked[0] === 0) {
            access_log(username, 'f');
            res.json({code: '2', message: '用户已注册，但未通过审核，登录失败。'});
        } else {
            access_log(username, 's');

            // 将用户登陆成功信息写入session
            var sess = req.session;
            sess.isLogin = true;

            res.json({code: '1', message: '用户存在，登陆成功。'})
        }
    });

});

function access_log(username, sign){

    // 读取日志，添加新日志，写入日志；
    // 若日志长度超出，则删除第一个记录。

    var sql_read = 'select access_log from users where username = ?';
    mysqlPool.doquery(sql_read, [username], function(result){
        if(result.length > 0){

            var d = new Date();

            var the_log = result[0].access_log;
            var the_log_arr = [];

            if(the_log.length > 0) the_log_arr = the_log.split('&');

            if(the_log_arr.length >= 10){
                the_log_arr.shift();
            }

            the_log_arr.push(
                sign + d.getFullYear() + utility.preZero(d.getMonth()+1) 
                + utility.preZero(d.getDate()) +utility.preZero(d.getHours()) 
                + utility.preZero(d.getMinutes())
            );

            the_log = the_log_arr.join('&');

            var sql = 'update users set access_log = ? where username = ?';
            mysqlPool.doquery(sql, [the_log, username], function(result){
                if(result.affectedRows === 1) {
                     //用户登录日志写入成功。
                     console.log('用户登录日志写入成功。')
                } else {
                    // 写入失败。
                    console.log('用户登录日志写入失败。')
                }
            });
        }
    });
}



Router.get('/logout', function(req, res){
    var sess = req.session;
    sess.isLogin = false;
    res.redirect('login');
});


Router.get('/login', function(req, res){
    res.render('users/login');
});

Router.post('/exists', function(req, res){
    var sql = 'select id from users where username = ?';
    mysqlPool.doquery(sql, [req.body.username], function(result){
        if(result.length === 1){
            res.json({code: '1', message: '用户存在，不能注册。'});
        } else {
            res.json({code: '0', message: '用户不存在，可以注册。'});
        }
    });
});

Router.post('/doRegister', function(req, res){
    var username = req.body.username;
    var email = req.body.email;
    var pass = req.body.password;

    var sql = 'insert into users (username, password, email) values(?, md5(?), ?)';

    mysqlPool.doquery(sql, [username, pass, email], function(result){

        if(result.affectedRows === 1) {
            res.json({code: '1', message: '用户注册成功。'});
        } else {
            res.json({code: '0', message: '用户注册失败。'});
        }
    });

});

module.exports = Router;