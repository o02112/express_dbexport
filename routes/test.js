var express = require('express');
var Router = express.Router();
var mysqlPool = require('../modules/mysql_pool');


Router.get('/', function(req, res){
    res.render('test/index');
});



module.exports = Router;