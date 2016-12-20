var express = require('express');
var Router = express.Router();
var mysqlPool = require('../modules/mysql_pool');


Router.get('/', function(req, res, next){
    res.render('domains/index');
});




Router.post('/list', function(req, res, next){
    var sql = 'select url, category, seo_name from domains';
    
    mysqlPool.doquery(sql, [], function(result, fields){

        res.json(result);
        // res.status(200).send('abc');
    });

});

Router.post('/add', function(req, res, next){
    res.send('ok');
});

Router.post('/delete', function(req, res, next){
    res.send('/delete');
});

Router.post('/update', function(req, res, next){
    res.send('/update');
});


module.exports = Router;