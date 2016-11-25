var express = require('express');
var Router = express.Router();
var csv = require('express-csv');
var mysqlPool = require('../modules/mysql_pool');


Router.get('/', function(req, res, next){

	res.render('customers/index');

});


Router.post('/get', function(req, res, next){
	var sql = `select id as '序号', 
	name as '名称', mobile as '电话', 
	date_format(submitted, '%Y-%m-%d %H:%i:%s') as '时间', 
	category as '关键字', user_action as '动作', 
	url as '地址', referrer as '来源地址', 
	is_new 
	from platform1  order by submitted desc`;
	mysqlPool.doquery(sql, [], function(result, fields){

		res.json(result);
		// res.status(200).send('abc');
	});
});

Router.post('/exportResource', function(req, res, next){
	var dataCate = req.body.dataCate,
	sqlCols = ` id as "序号", name as "名称", 
		mobile as "电话", 
		category as "分类", 
		user_action as "动作", 
		date_format(submitted, "%Y-%m-%d %H:%i:%s") as "时间" `,

	sql = 'select ' + sqlCols + ' from platform1 ';

	if(dataCate == 'new'){ 
		sql += ' where is_new=1  order by submitted desc'; 
	}


	mysqlPool.doquery(sql, [], function(result, fields){
		if(result.length < 1) {
			res.json({code: 0, message: '记录数为0'});
			return;
		}
		var date = new Date(),
			keys = [];

		for(var key in result[0]){
			keys.push(key);
		}
		result.unshift(keys);
		res.csv(result);
	});

});

Router.post('/markOld', function(req, res, next){
	// mark old;
	var sql = 'update platform1 set is_new=0 where is_new=1';

	mysqlPool.doquery(sql, [], function(result){
		if(result.affectedRows > 0){
			res.json({code: 1, message: '标记为旧成功。'})
		} else {
			res.json({code: 0, message: '更新记录数为0。'})
		}
	})
});

Router.post('/looping', function(req, res, next){
	var sql = 'select count(*) as count from platform1 where is_new=1';
	mysqlPool.doquery(sql, [], function(result){
		if(result[0].count > 0){
			res.json({code: 1, message: '有新资源产生。'});
		} else {
			res.json({code: 0, message: '无新数据。'});
		}
		// res.json(result[0].count);
	})
});




module.exports = Router;