var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    connectionLimit: 10,
    database: 'platform1'
});

pool.doquery = function(sql, values, callbk) {
    if(!sql || !values) return false;

    query = pool.getConnection(function(err, connection){
        if(err) throw err;
        connection.query(sql, values, function(err, result){
            if(err) throw err;

            connection.release();
            callbk(result);
        });
    });
}


module.exports = pool;