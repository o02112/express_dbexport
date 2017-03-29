var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');

var index = require('./routes/index');
var test = require('./routes/test');
var timer = require('./routes/timer');
var domains = require('./routes/domains');
var customers = require('./routes/customers');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static( path.join(__dirname, 'public')));




// Use the session middleware
// 登陆验证
app.use(session({
 secret: 'zctl.secret', 
 resave: false,
 saveUninitialized: false,
 // cookie: { secure: true }
}));

app.use(function(req, res, next){
    var sess = req.session;
    var reg = /\/users\//; // 用户登录、注册等
    var reg_test = /\/test\//;
    var reg_timer = /\/timer\//;
    var reg_addNew = /\/customers\/addNew/; // 单页上的表单提交
    
    if (
      sess.isLogin ||
      reg.test(req.path) ||
      reg_test.test(req.path) ||
      reg_timer.test(req.path) ||
      reg_addNew.test(req.path) 
    ) {
      next();
    } else {
      res.redirect('/users/login');
    }
});



app.use('/', index);
app.use('/test', test);
app.use('/timer', timer);
app.use('/domains', domains);
app.use('/customers', customers);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;