var express = require('express');
var Router = express.Router();
var mysqlPool = require('../modules/mysql_pool');

// Access the session as req.session
Router.get('/', function(req, res) {
  res.send('test');
  /*
  var sess = req.session
  if (sess.views) {
    sess.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + sess.views + '</p>')
    res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    sess.views = 1
    res.end('welcome to the session demo. refresh!')
  }

*/
})


module.exports = Router;