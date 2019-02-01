var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/login');
var apiRouter = require('./routes/api');
var mainRouter = require('./routes/main');
var restApiRouter = require('./routes/restApi');
const bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));        //get방식을 받기위한 조건
app.use(cookieParser());
//로그인 session 위한 설정
app.use(session({
    secret: 'phj20190104secretkey',
    resave: false,
    saveUninitialized: true
}));

app.use(function(req, res, next) {         //ejs에서 session값 가져와 쓰기 위한 추가
  res.locals.user = req.session;
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // body의 데이터를 json형식으로 받음

app.use('/', indexRouter);
app.post('/login', usersRouter.login);
app.use('/main', mainRouter.main);
app.post('/restApi', restApiRouter.post);

app.get('/logout', usersRouter.logout);
app.get('/api', apiRouter.api);
app.post('/api', apiRouter.api_post);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
