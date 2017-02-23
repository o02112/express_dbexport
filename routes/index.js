var express = require('express');
var Router = express.Router();
var session = require('express-session');

var mysqlPool = require('../modules/mysql_pool');

Router.get('/', function(req, res){

    var sess = req.session;

	// 获得菜单
	var sql = 'select title, path, icon_class_name from menu '+
	' where permission <= ? ' +
	' order by `order` ';
	mysqlPool.doquery(sql, [ sess.permission ], function(menuResult){

    // 将所有权限数据保存至session
    // 避免多次从数据库中读取，待优化
    var sql_permission = 'select name, value from permissions';
    mysqlPool.doquery(sql_permission, [], function(result) {
      sess.permissions = result;

      res.render('index', { menuItems: menuResult });
    })
  
	});

})

Router.get('/dashboard', function(req, res){
  res.render('dashboard/index');
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