var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var auth_url = 'http://guanaikangfu.com/user/callback';

var db_define = require('./db/define').define;
var orm = require('orm');
var app = express();

//app.listen(80, '0.0.0.0');
//app.use(orm.express("mysql://guanai:guanai@rdsnsbba6rlncdjwb97bd.mysql.rds.aliyuncs.com/guanai", {
app.listen(8080, '0.0.0.0')
app.use(orm.express("mysql://root@localhost/guanai", {
        define: function (db, models, next) {
            db_define(db, models);
            db.sync(function (err) {
                if (err) {
                    console.error(err);
                }
            });
            next();
        }
    }
));

var weixin = require('./biz/weixin');
weixin(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


var routes = require('./routes/index');
//var users = require('./routes/users');
var login = require('./routes/login');
var doctor = require('./routes/doctor');
var sick = require('./routes/sick');
var checklist = require('./routes/checklist');
var answer = require('./routes/answer');
var loginCheck = require('./routes/loginCheck');
var imageUpload = require('./routes/imageUpload');
var sicktable = require('./routes/sicktables');
app.use(loginCheck);

app.use(express.static(path.join(__dirname, 'public')));
// app.use(function (req, res, next) {
//     var open_id = req.cookies.open_id;
//     if (!open_id) {
//         res.redirect("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaf3a162fe7e04d37&redirect_uri=http%3A%2F%2Fguanaikangfu.com%2Fuser%2Fcallback&response_type=code&scope=snsapi_base#wechat_redirect");
//     } else {
//         next();
//     }
// });

app.use('/', routes);
//app.use('/users', users); 
app.use('/user', login);
app.use('/doctor', doctor);
app.use('/sick', sick);
app.use('/checklist', checklist);
app.use('/answer', answer);
app.use('/image', imageUpload);
app.use('/sicktables', sicktable);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
