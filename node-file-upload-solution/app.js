var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
/**
  Morgan is another HTTP request logger middleware for Node.js. 
  It simplifies the process of logging requests to your application.  
  You might think of Morgan as a helper that collects logs from your server,
   such as your request logs. It saves developers time because they don’t have to manually create common logs. It standardizes and automatically creates request logs.
**/
var logger = require('morgan');

/**
cookie-parser will parse the Cookie header and handle cookie
 separation and encoding, maybe even decrypt it!
**/
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var products = require('./routes/products');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

// parse json data
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
// https://www.npmjs.com/package/body-parser-json 
// The extended argument allows to choose between parsing the 
// urlencoded data with the querystring library (when false) 
// or the qs library (when true). 
// The "extended" syntax allows for rich objects and 
// arrays to be encoded into the urlencoded format, 
// allowing for a JSON-like experience with urlencoded. 
// For more information, please see the qs library.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// apply the routes to our application
app.use('/', index);
app.use('/products', products);

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
