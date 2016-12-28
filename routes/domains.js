var express = require('express');
var Router = express.Router();
var mysqlPool = require('../modules/mysql_pool');


Router.get('/', function(req, res){
    res.render('domains/index');
});




Router.post('/list', function(req, res){
    var sql = 'select id, domain, category, seo_name from domains';
    
    mysqlPool.doquery(sql, [], function(result, fields){

        res.json(result);
        // res.status(200).send('abc');
    });

});

Router.post('/add', function(req, res){
    var domain = req.body.domain;
    var category = req.body.category;
    var seo_name = req.body.seo_name;
    var sql = 'insert into domains set ?';
    mysqlPool.doquery(sql, req.body, function(result){
        res.send(result);
    });
    
});

Router.post('/delete', function(req, res){
    var sql = 'delete from domains where id= ?';
    mysqlPool.doquery(sql, [req.body.id], function(result){
        if(result.affectedRows === 1) {
            res.send('deleted');
        } else {
            re.send('error');
        }
    })
    
});

Router.post('/update', function(req, res){
    var id=req.body.id;
    delete req.body.id;
    var sql = 'update domains set ? where id='+ id;
    mysqlPool.doquery(sql, req.body, function(result){
        if(result.affectedRows === 1) {
            res.send('updated');
        }else {
            res.send('error');
        }
        // res.send(result);
    });
});


module.exports = Router;