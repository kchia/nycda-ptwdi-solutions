// The high level strategy is when the user signs up or logs in:
// The server will generate the jwt.
// It will return the token in the response of the sign up or log in requests
// The client will then save the token in the browser's local storage.
// From then on, each time the client wants to make a request it will need to pass the token to the server.
// The server will decode the information
// Then it will verify the token is valid/hasn't expired/belongs to that user etc

// If all the checks pass, it will allow the request to go through.

// write the code that does the actual verification and the code that tells passport when to do so.

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('../config/config');

const User = require('../db').users;

const opts = {
// passport-jwt needs to know where the header is going to be located in each request.
// There are a few different options here. We'll be using the ExtractJwt.fromHeader('authorization') option
// So all incoming requests that require authorization will need to pass the token in the header under the 'authorization' key
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.jwtSecret,
}

module.exports = function(passport) {
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        //The function we pass in will contain the decoded jwt_payload. 
        //This will have the user id we set earlier in it.
        User.findById(jwt_payload.id)
        .then(function(user) {
            if (user) {
                // user was found successfully
                done(null, user);
            } else {
                // no user was found for that id
                done(null, false, 'No user was found for the token provided');
            }
        });
    }));
};