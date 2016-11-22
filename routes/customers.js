var express = require('express');
var Router = express.Router();

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
	var sql = "select \
	name as '名称', mobile as '电话', \
	date_format(submitted, '%Y-%m-%d %H:%i:%s') as '时间', \
	category as '关键字', user_action as '动作', \
	url as '地址', referrer as '来源地址' \
	from platform1"
	doquery(sql, [], function(result, fields){

		res.json(result);
		// res.status(200).send('abc');
	});
});





module.exports = Router;