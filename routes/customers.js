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
	doquery('select * from platform1', [], function(result, fields){

		res.json(result);
		// res.status(200).send('abc');
	});
});





module.exports = Router;