var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { checkIsAdmin } = require('./app/view-model/auth');

// frontend routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var memberManagerRouter = require('./routes/member-manager');
var articleManagerRouter = require('./routes/article-manager');

// backend routes
var authApiRouter = require('./routes/api/auth');
var usersApiRouter = require('./routes/api/users');
var articlesApiRouter = require('./routes/api/articles');
var memberApiRouter = require('./routes/api/member');

var app = express();
require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env['COOKIE_KEY']));
app.use(express.static(path.join(__dirname, 'public')));

// middleware
app.use(checkIsAdmin);

// frontend routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/member-manager', memberManagerRouter);
app.use('/article-manager', articleManagerRouter);

// backend routes
app.use('/api/auth', authApiRouter);
app.use('/api/users', usersApiRouter);
app.use('/api/articles', articlesApiRouter);
app.use('/api/member', memberApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
