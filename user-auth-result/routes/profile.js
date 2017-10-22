var express = require('express');
var router = express.Router();
const models  = require('../db');

var User = require('../db').users;

// curl -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNTA4NDUzODg2LCJleHAiOjE1MDg0NTQxODZ9.BUY4u4btRnSrVz51JzBKdF0pAY3qFZ6U_3eK-EBsjUg" -X GET http://localhost:3001/api/protected/profile
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