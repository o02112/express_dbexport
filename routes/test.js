var express = require('express');
var Router = express.Router();
var mysqlPool = require('../modules/mysql_pool');

// Access the session as req.session
Router.get('/', function(req, res) {

  res.send('test');

})


module.exports = Router;