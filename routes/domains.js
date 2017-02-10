var express = require('express');
var Router = express.Router();
var mysqlPool = require('../modules/mysql_pool');
var utility = require('../modules/utility');


Router.get('/', function(req, res){
    res.render('domains/index');
});




Router.post('/count/:how', function(req, res){
    var table_view = 'count_' + req.params.how;
    var sql = 'select domain, total from ' + table_view;
    
    mysqlPool.doquery(sql, [], function(result, fields){
        res.json(result);
    });
});

Router.post('/countAll/:days', function(req, res){
    var d = new Date(), year, month, day;
    var days = parseInt(req.params.days);
    var resultObj = {
        data: [],
        date: []
    };
    var i = 0;
    
    loopQuery(i);

    function loopQuery(i){
        i++;
        if(i > days){
            res.send(resultObj);
            return;
        }


        year = d.getFullYear();
        month = utility.preZero(d.getMonth() + 1);
        day = utility.preZero(d.getDate());

        resultObj.date.push(year+'.'+month+'.'+day);

        d.setDate(d.getDate()-1);


        var sql = 'select count(*) as count from platform1 where submitted like ';
            sql += ' "'+year+'-'+month+'-'+day+'%"';

        mysqlPool.doquery(sql, [], function(result, fields){
            resultObj.data = resultObj.data.concat(result);
            loopQuery(i);
        });
    }


    // function preZero(num, length){
    //     length = length || 2;
    //     num = num +'';
    //     var str = '';
    //     if(num.length < length) {
    //         for(var i=0;i<(length-num.length); i++){
    //             str += '0';
    //         }
    //     }
    //     return str + num;
    // }

});

Router.post('/list', function(req, res){
    var sql = 'select id, domain, category, seo_name from domains';
    
    mysqlPool.doquery(sql, [], function(result, fields){
        res.json(result);
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
        console.log(req.body.id);
        if(result.affectedRows === 1) {
            res.send('deleted');
        } else {
            res.send('error');
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