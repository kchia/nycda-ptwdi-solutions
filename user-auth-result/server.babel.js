var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//PassportJS is a node module whose sole purpose is to authenticate requests, 
//which it does through an extensible set of plugins known as strategies.
// You can use Passport to allow users to use their Facebook, GMail, 
// LinkedIn and other accounts as authentication into your website.
//http://passportjs.org/docs
var passport = require('passport');

var app = express();
app.use(passport.initialize());

/**
Since we are handling user accounts ourselves we will be using the Passport Local strategy.
**/
require('./strategies/passport-local')(passport);
require('./strategies/passport-jwt')(passport);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

var userRoutes = require('./routes/users')(passport);
var profileRoutes = require('./routes/profile');

// mount routers
app.use('/api/user', userRoutes);

//  protected routes that should be only accessible to logged in users.
// Now that we've written the code that actually performs the verification we'll need to tell express which routes require the authorization.
// To do this we'll need to create an identifier in our routes to indicate that a route requires authorization.
// We're going to use 'api/protected' to denote this.
app.use('/api/protected', function(req, res, next) {

  // For any incoming requests that are '/api/protected' we are going to call the authenticate
  // function on passport and pass in the 'jwt' strategy to denote we want to verify the token

  /**
    After successful authentication, Passport will establish a persistent login session. 
    This is useful for the common scenario of users accessing a web application via a browser. 
    However, in some cases, session support is not necessary. 
    For example, API servers typically require credentials to be supplied with each request. 
    When this is the case, session support can be safely disabled by setting the session option to false.
  **/
  passport.authenticate('jwt', {session:false}, function(err, user, jwtError) {

    //When we do this the verification code we wrote above will 
    //execute and if successful, will pass us back a user
    if (user) {
      // If we get back a user then we'll log that user in and proceed to the next route handler
      req.login(user, null, () => {})
      next()
    } else  {
      /**
        if we don't get a user that means we had a jwtError occur
        Either the token wasn't a real token
        Or it was expired
        Or our server didn't know how to read it
      **/
      next(jwtError)
    }
  })(req, res, next)
});

app.use('/api/protected', profileRoutes);

app.use('/api/*', function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.error('DEV ERROR')
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.error('PROD ERROR')
    res.json({
      message: err.message,
      error: {}
    });
  });
}

module.exports = app;
