var express = require('express');

// create an expres application
var app = express();

app.get('/hello/world', function(request, response){
	console.log('got request for "/hello/world"');
	// respose.send() takes care of setting Content-Type to text/html automatically if the response is a String
	// response.send('hello there!');

	// response.set('Content-Type', 'text/plain');
	// response.send('<h1>Hello!</h1>');

	// response.send() takes care of setting the response's Content-Type to application/json if the sent data is an Array or Object
	response.send({ message: 'hello there!'});

});

/** 
  ROUTE WITH PARAMS/DYNAMIC ROUTES
**/
app.get('/hello/:name', function(request, response) {
	response.send(`hello ${request.params.name}`);
});

app.get('/users/:id', function(request, response) {
	var userId = request.params.id;
	console.log(`got request for '/users/${userId}'`);

	// in a real app we would look for user in a database
	var users = {
		1: 'John',
		2: 'Sandy',
		3: 'David'
	};

	response.send(`Hello ${users[userId]}`);
});

// Return a friendly greeting for firstName and lastName query params
// on the route /hi

// http://localhost:3000/hi?firstName=Hou&lastName=Chia
app.get('/hi', function(request, response) {
	var firstName = request.query.firstName;
	var lastName = request.query.lastName;

	response.send(`hi ${firstName} ${lastName}`);
});

app.get('*', function(request, response) {
	response.status(404).send('uh oh! page not found!');
});

app.listen(3000, function() {
	console.log('Example app is listening on port 3000!');
})

