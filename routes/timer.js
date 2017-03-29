var express = require('express');
var Router = express.Router();


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

setInterval(getNumber, 60 * 10 * 1000); // 10 分钟 换一个微信号

Router.get('/wechatNumber', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	res.send(wechatNumber);
});

module.exports = Router;
