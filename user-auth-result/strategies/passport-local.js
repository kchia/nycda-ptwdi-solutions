var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

/**
Once a user has signed up or logged in, we want to give them access to certain information they didn't have before.
We also want to prevent non-authenticated users from accessing this information as well.
In order to accomplish this we'll be using a technology called a JSON Web Token (jwt).
**/
var jwt = require('jsonwebtoken');
var config = require('../config/config');

var User = require('../db').users;

function getUserParams(req) {
	var body = req.body
	return {
		email: body.email,
		password: body.password,
		firstName: body.firstName,
		lastName: body.lastName
	};
}

/**
  In a typical web application, the credentials used to authenticate a user will 
  only be transmitted during the login request. If authentication succeeds, a session will
  be established and maintained via a cookie set in the user's browser.
  Each subsequent request will not contain credentials, but rather the unique cookie 
  that identifies the session. In order to support login sessions, Passport will serialize and deserialize user 
  instances to and from the session.
**/
function initializeSerialization(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
}

function processSignupCallback(req, email, password, done) {
  User.findOne({
    where: { 
        'email' :  email 
    },
    attributes: ['id']
  })
  .then(function(user) {
    // check to see if theres already a user with that email
    if (user) {

      /** The 'done' callback provides us a way of telling passport we're done executing the code we want to execute.
      •   There are three arguments that 'done' gets called with eg: done (error, result, message):
      •   error: if there was an error we can pass it to the done function and it will forward it along.
      •   result: if the outcome was successful this is where we pass the result, if not, we pass the value 'false'.
      •   message: this is an optional param that allows us to pass a message through the call chain.
      // user exists call done() passing null and false
      **/
      return done(null, false, 'That email is already taken.');
    } else {
      // create the new user
      var userToCreate = getUserParams(req)

      /**
        •   In order to encrypt the passwords we'll be using a node module called 'bcrypt'.
        •   At a high level, bcrypt is a function that accepts two arguments: a string and a random 
        input and generates a 'hash' of that string (an encrypted string).
        •   The first argument is the string we want to encrypt.
        •   The second argument is what's called a 'saltRound'.
        •   bcrypt uses the saltRound to generate a 'salt' which is the random input that is fed into the function that creates the hash. 
        •   The more rounds, the more random (secure) the data. 
        However there is a time cost with having a lot of rounds, we will be using 10.
      **/
      bcrypt.hash(userToCreate.password, 10, function(err, hash) {
        userToCreate.password = hash;

        User.create(userToCreate)
        .then(function(createdRecord) {

          /**

          JWT
          A jwt is essentially a long string that has certain information encoded in it.
          Your sever will be the only server that knows how to take the string, decode it and pull the information out of it.
          Some information we typically put in the jwt:
          The user's id
          An expiration date of the token
          Anything else that makes sense for your application.

          example token:
          eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhd
          CI6MTQ3ODgwNzMxMCwiZXhwIjoxNDc4ODA3MzQwfQ.VPvXni
          WBG5O3UBWy8i5Ki79lY9W2Slyhfv5L8r8WzyA

          Once we create a user we'll need to also create a token, encode the id 
          into the token and save the user with the updated token value.

          The jwt module has a function call sign that takes the following parameters:

          An object containing any additional information you want to encode.
          The jwtSecret: this is what enables your server (and only your server) 
          to decode any incoming tokens
          An expiration time in seconds (eg 60 * 60 = 1 hour)
          Let's update our processSignupCallback so that we save the token in the User model.
          **/
          jwt.sign({id: createdRecord.id}, 
            config.jwtSecret, {
              expiresIn: config.jwtExpiration
            }, function(err, token) {
              createdRecord.token = token;
              //once user is created call done with the created user
              return done(null, createdRecord);
            });
          });
      });
    }
  });
}

/**
This is the callback where we'll be putting our logic that determines if the request is a valid login
**/
function processLoginCallback(email, password, done) {
    // first let's find a user in our system with that email
    User.findOne({
      where: { 
          'email' :  email 
      }
    })
    .then(function(user) {
      if (!user) {
        return done(null, false, "No user name found with provided email")
      }
      // make sure the password they provided matches what we have
      bcrypt.compare(password, user.password, function(err, result) {
        user.password = undefined;

        if (err) {
          return done(null, false, err)
        } else if (!result) {
          return done(null, false, "Invalid Password for provided email")
        } else {
          jwt.sign({id: user.id}, config.jwtSecret, {expiresIn: config.jwtExpiration}, function(err, token) {
            user.token = token;
            user.save()
            .then(function(savedRecord) {
              return done(null, savedRecord);
            });
          });
        }
      });
    });
}

module.exports = function(passport) {

  initializeSerialization(passport);

  /**
    To define our local sign-up strategy, we'll call the 'use' function on the passport object and provide the following:
    • 'local-signup': the name we're calling this strategy.
    • usernameField: the field on the request that will contain the username
    • passwordField: the field on the request that will contain the password
    • passReqToCallback: whether to pass the incoming request to the callback that will handle the logic for signing up.
    • the callback: the function that will perform the logic and actually create the new user in our system
  **/

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, processSignupCallback));

  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
  }, processLoginCallback));
};