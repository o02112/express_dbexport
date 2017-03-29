var express = require('express');
var Router = express.Router();
var mysqlPool = require('../modules/mysql_pool');


var wechatNumberArr = ['zctl111111','zctl222222','zctl333333','zctl444444','zctl555555','zctl-12345679','zctl777777','fc11883399'];


var i = 0;
var wechatNumber = wechatNumberArr[wechatNumberArr.length-1];
var getNumber = function() {
	i++;
	if(i>wechatNumberArr.length) {
		i=1;
	}
	wechatNumber = wechatNumberArr[i-1];
}

setInterval(getNumber, 5*1000);

// Access the session as req.session
Router.get('/', function(req, res) {

  res.send('test');

});

Router.get('/wechatNumber', function (req, res) {
	res.send(wechatNumber);
});


module.exports = Router;