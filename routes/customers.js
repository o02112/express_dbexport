var express = require('express');
var Router = express.Router();
var csv = require('express-csv');
var session = require('express-session');

var mysqlPool = require('../modules/mysql_pool');


Router.get('/dbex', function(req, res){

	res.render('customers/index');

});

Router.get('/datatable', function(req, res){
	res.render('customers/index', { findMobile: false, phoneVolumn: false });
});

Router.get('/datatable/phone', function(req, res){
	res.render('customers/index', { findMobile: true, phoneVolumn: true });
});

Router.post('/get', function(req, res){ // 请求数据

	var dbTable = 'platform1',
		fromDate = req.body.fromDate,
		toDate = req.body.toDate,
		domain = req.body.domain,
		includePhone = req.body.includePhone;

	var pm = getExportPhonePermission(req);

	if((includePhone == '1') && ( req.session.permission >= pm ) ){
		var mobile = " mobile as '电话',  ";
	} else {
		var mobile = '';
	}

	if(domain.indexOf('jingu618') > 0){
		dbTable = 'platform_jingu618';
	}

	if(domain !== ''){
		domain = " and url like '%"+domain+"%'";
	} else {
		domain = '';
	}

	var where = " where str_to_date(submitted, '%Y-%m-%d %H:%i:%s') >= '" + fromDate +"' ";
		where += " and str_to_date(submitted, '%Y-%m-%d %H:%i:%s') <= '" + toDate +"' ";
		where += domain;

	var sql = "select id as '序号',  \
		case when is_new=1 then '1' else '0' end as '新记录', \
		name as '名称', "+ mobile + " \
		mobile_address as '号码归属地', \
		date_format(submitted, '%Y-%m-%d %H:%i:%s') as '时间',  \
		category as '分类', user_action as '动作',  \
		url as '地址', referrer  as '来源地址', \
		referrer_keyword as '搜索输入' \
		from "+ dbTable + where +" order by submitted desc "; // limit 0, 100 ";

	mysqlPool.doquery(sql, [], function(result){

		res.json(result);
		// res.status(200).send('abc');
	});
});

Router.post('/findMobile', function(req, res){ // 查找手机号码

	var sql = "select id as '序号',  \
		case when is_new=1 then '1' else '0' end as '新记录', \
		name as '名称',  mobile as '电话',  \
		mobile_address as '号码归属地', \
		date_format(submitted, '%Y-%m-%d %H:%i:%s') as '时间',  \
		category as '分类', user_action as '动作',  \
		url as '地址', referrer  as '来源地址', \
		referrer_keyword as '搜索输入' \
		from platform1 where mobile like concat('%', ?, '%') order by submitted desc ";

		mysqlPool.doquery(sql, [req.body.mobile], function(result) {
			if(result.length > 0){
				res.json(result);
			} else {
				res.json({ code: '0', message: '查询结果为空。'})
			}
		})
});

Router.post('/exportResource', function(req, res){ // 导出
	var dataCate = req.body.dataCate,
		dbTable = 'platform1'
		mobile = '';

	var pm = getExportPhonePermission(req);

	if((req.body.includePhone == '1') && ( req.session.permission >= pm ) ){
		var mobile = ' mobile as "电话", ';
	}

	var sqlCols = 'id as "序号", name as "名称", ' + mobile +' \
		mobile_address as "号码归属地", \
		category as "分类", \
		user_action as "动作", \
		date_format(submitted, "%Y-%m-%d %H:%i:%s") as "时间", \
		url as "地址" ';

	var sql = 'select ' + sqlCols + ' from ' + dbTable;

	if(dataCate === 'filter'){ // 按筛选规则导出
		var fromDate = req.body.fromDate;
		var toDate = req.body.toDate;
		var domain = req.body.domain;


		if(domain.indexOf('jingu618') > 0){
			dbTable = 'platform_jingu618';
		}

		if(domain !== ''){
			domain = " and url like '%"+domain+"%'";
		} else {
			domain = '';
		}

		sql = 'select ' + sqlCols + ' from ' + dbTable;

		var where = " where str_to_date(submitted, '%Y-%m-%d %H:%i:%s') >= '" + fromDate +"' ";
		where += " and str_to_date(submitted, '%Y-%m-%d %H:%i:%s') <= '" + toDate +"' ";
		where += domain;
			
		sql += where;

	} else if(dataCate === 'new'){ // 导出新数据
		sql += ' where is_new=1 '; 
	} 

	sql += ' order by submitted desc';

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

Router.post('/markOld', function(req, res){ // 新数据导出 - 做旧
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


Router.post('/addNew', function(req, res){ // 单页提交数据

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	if( ! checkMobile(req.body.mobile)) {
		res.send('faile');
		return;
	}

  var sql = 'insert into platform1 set ?';

	var sql_exists = 'select id from platform1 where mobile=?';

	if(req.body.url.indexOf('jingu618') > 0) {
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

			if(req.body.url.indexOf('jingu618') > 0) {
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



Router.get('/ip', function(req, res){
	var ip = 
		// req.headers['x-forwarded-for'] || 
		req.connection.remoteAddress || 
		req.socket.remoteAddress || 
		req.connection.socket.remoteAddress; // ::ffff:192.168.1.104
			

	res.send(ip);

})

function checkMobile(mobile){
    var partten = /^1[3-9]\d{9}$/;

    return partten.test(mobile);
}


function getExportPhonePermission(req) {
  var sess = req.session,
  	permissions = sess.permissions, // 得到数据库中所有权限数据
  	pm = null;

	// 获取本项操作所需权限
	for (var i=0; i<permissions.length; i++) {
		if ( permissions[i].name === 'export_customer_phone' ){
			pm = permissions[i].value; // 导出客户电话号码所需权限值
			break;
		}
	}

	return pm;
}


module.exports = Router;