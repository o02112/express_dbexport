var express = require('express');
var Router = express.Router();
var csv = require('express-csv');

var mysql = require('mysql');


Router.get('/', function(req, res, next){

	res.render('customers/index');

});



var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root',
	connectionLimit: 10,
	database: 'platform1'
});

function doquery(sql, values, callbk) {
	if(!sql || !values) return false;

	pool.getConnection(function(err, connection){
		if(err) throw err;
		connection.query(sql, values, function(err, result){
			if(err) throw err;

			connection.release();
			callbk(result);
		});
	});
}



Router.post('/get', function(req, res, next){
	var sql = `select id as '序号', 
	name as '名称', mobile as '电话', 
	date_format(submitted, '%Y-%m-%d %H:%i:%s') as '时间', 
	category as '关键字', user_action as '动作', 
	url as '地址', referrer as '来源地址', 
	is_new 
	from platform1`;
	doquery(sql, [], function(result, fields){

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
		sql += ' where is_new=1'; 
	}


	doquery(sql, [], function(result, fields){
		if(result.length < 1) res.json({code: 0, message: '记录数为0'});
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

	doquery(sql, [], function(result){
		if(result.affectedRows > 0){
			res.json({code: 1, message: '标记为旧成功。'})
		} else {
			res.json({code: 0, message: '更新记录数为0。'})
		}
	})
});




module.exports = Router;