var express = require('express');
var router = express.Router();
const models  = require('../db');

var User = require('../db').users;

router.get('/profile', function(req, res, next) {
	User.findById(req.user.id)
	.then(function(user) {
		res.json({
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			id: user.id
		})
	});
});

module.exports = router