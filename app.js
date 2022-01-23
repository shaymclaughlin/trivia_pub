var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getresultsRouter = require('./routes/getresults');
var triviaRouter = require('./routes/trivia');
var triviaStartRouter = require('./routes/triviastart');
var triviaAppRouter = require('./routes/triviaapp');
var triviaVerifyRouter = require('./routes/triviaverify');
var triviaResultsRouter = require('./routes/triviaresults');
var triviaQuizIdRouter = require('./routes/triviaquizid');
//var triviaErrorRouter = require('./routes/trivia');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', triviaRouter);
app.use('/users', usersRouter);
app.use('/results', getresultsRouter);
app.use('/trivia', triviaRouter);
app.use('/triviastart', triviaStartRouter);
app.use('/triviaapp',triviaAppRouter);
app.use('/triviaverify',triviaVerifyRouter);
app.use('/triviaresults',triviaResultsRouter);
app.use('/triviaquizid',triviaQuizIdRouter);
app.use('/qrcode', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
//  next(createError(404));
  
    res.render('triviaerror', { 
      title: '404 Error, Page Not Found',
      flavormessage: 'Uh Oh :(',
      message: 'It looks like that page cannot be found or does not exist, sorry.'
    });
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
