var express = require('express');
var Router = express.Router();
var csv = require('express-csv');
var mysqlPool = require('../modules/mysql_pool');


Router.get('/', function(req, res, next){
	res.end();
});

Router.get('/dbex', function(req, res, next){

	res.render('customers/index');

});

Router.get('/view', function(req, res, next){

	res.render('customers/index');

});


Router.post('/get', function(req, res, next){ // 全部数据
	if(req.body.m === '1'){
		var sql = `select id as '序号', 
		case when is_new=1 then '1' else '0' end as '新记录', 
		name as '名称', mobile as '电话', 
		date_format(submitted, '%Y-%m-%d %H:%i:%s') as '时间', 
		category as '分类', user_action as '动作', 
		url as '地址', referrer as '来源地址'
		from platform1  order by submitted desc`;
	} else {
		var sql = `select id as '序号', 
		case when is_new=1 then '1' else '0' end as '新记录', 
		name as '名称', 
		date_format(submitted, '%Y-%m-%d %H:%i:%s') as '时间', 
		category as '分类', user_action as '动作', 
		url as '地址', referrer as '来源地址'
		from platform1  order by submitted desc`;

	}
	mysqlPool.doquery(sql, [], function(result, fields){

		res.json(result);
		// res.status(200).send('abc');
	});
});

Router.post('/exportResource', function(req, res, next){ // 导出

	var dataCate = req.body.dataCate;
	if(req.body.m === '1'){
		var sqlCols = ` id as "序号", name as "名称", 
			mobile as "电话", 
			category as "分类", 
			user_action as "动作", 
			date_format(submitted, "%Y-%m-%d %H:%i:%s") as "时间" `;
	} else {
		var sqlCols = ` id as "序号", name as "名称", 
			category as "分类", 
			user_action as "动作", 
			date_format(submitted, "%Y-%m-%d %H:%i:%s") as "时间" `;
	}

	var sql = 'select ' + sqlCols + ' from platform1 ';

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

Router.post('/markOld', function(req, res, next){ // 新数据导出 - 做旧
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

// Router.post('/looping', function(req, res, next){ 
// 	var sql = 'select count(*) as count from platform1 where is_new=1';
// 	mysqlPool.doquery(sql, [], function(result){
// 		if(result[0].count > 0){
// 			res.json({code: 1, message: '有新资源产生。'});
// 		} else {
// 			res.json({code: 0, message: '无新数据。'});
// 		}
// 		// res.json(result[0].count);
// 	})
// });

Router.post('/addNew', function(req, res, next){ // 单页提交数据
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  	var sql = 'insert into platform1 set ?';

	var sql_exists = 'select id from platform1 where mobile=?';

	if(req.body.url.indexOf('gold.jingu618.net') > 0) {
		sql_exists = 'select id from platform_jingu618 where mobile=?';
	}

	var mobile = req.body.mobile;

	mysqlPool.doquery(sql_exists, [mobile], function(result){
		if(result.length > 0) {
			res.send('mobile_exists');
		} else{

			var remoteIp = req.headers['x-forwarded-for'] || 
							req.connection.remoteAddress || 
							req.socket.remoteAddress || 
							req.connection.socket.remoteAddress; // ::ffff:192.168.1.104
			
			req.body.remote_ip = remoteIp;

			if(req.body.url.indexOf('gold.jingu618.net') > 0) {
				sql = 'insert into platform_jingu618 set ?';
			}

		  	mysqlPool.doquery(sql, req.body, function(result){

		  		if( result.insertId > 0 ){
		  			res.send('insert_success');
		  		} else {
		  			res.send('faile');
		  		}
		  		
		  	});
		}
	});
});

// Router.post('/urlTimeLine', function(req, res, url){ // 按月统计每个地址的提交
// 	var sql = `select DATE_FORMAT(submitted,'%Y-%m') as '日期',
// 		 url as '地址',count(*) as '总计' from platform1 
// 		 group by url, DATE_FORMAT(submitted,'%Y-%m') 
// 		 order by url desc`;
	
// 	var sql = 'SELECT url FROM platform1 GROUP BY url';
// 	var urls = [];

// 	mysqlPool.doquery(sql, [], function(result){
// 		if(result.length > 0){
// 			urls = result;
// 		} else {
			
// 		}
// 	});

	
// });


Router.get('/ip', function(req, res){
	var ip = 
							// req.headers['x-forwarded-for'] || 
							req.connection.remoteAddress || 
							req.socket.remoteAddress || 
							req.connection.socket.remoteAddress; // ::ffff:192.168.1.104
			

	res.send(ip);

})


module.exports = Router;