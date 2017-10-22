var express = require('express');
var router = express.Router();
const models  = require('../db');

module.exports = function(passport) {

	// POST /api/user/signup

	// curl -d '{"email": "qwer@gmail.com", "password":"654321" }' -H "Content-Type: application/json" -X POST http://localhost:3001/api/user/signup
	router.post('/signup', function(req, res, next) {
		passport.authenticate('local-signup', function(err, user, info) {
			if (err) {
			  	return next(err); // will generate a 500 error
			}

			if (!user) {
			   	return next({ error : true, message : info });
			}

			req.login(user, function(loginErr) {
			   	if (loginErr) {
			     	return next(loginErr);
			   	}
			   	return res.json({
					email: user.email,
					id: user.id,
					token: user.token
				});
			}); 
		})(req, res, next);
	});

	// POST /api/user/login
	// curl -d '{"email": "qwer@gmail.com", "password":"654321" }' -H "Content-Type: application/json" -X POST http://localhost:3001/api/user/login
	router.post('/login', function(req, res, next) {
		passport.authenticate('local-login', function(err, user, info) {
			if (err) {
			  	return next(err); // will generate a 500 error
			}

			if (! user) {
			   	return next({ error : true, message : info });
			}

			req.login(user, function(loginErr) {
			    if (loginErr) {
					return next(loginErr);
			    }
			    return res.json({
					email: user.email,
					id: user.id,
					token: user.token
				});
			}); 
		})(req, res, next);
	});

	return router;
};
