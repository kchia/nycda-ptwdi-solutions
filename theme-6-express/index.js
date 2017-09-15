var express = require('express');

// create an express application
var app = express();

var fs = require('fs');

var parser = require('body-parser');

//parses requests with the content type of `application/json`
// constructs request.body for every incoming request
app.use(parser.json());

//if we wanted to forbid query string usage, that could be done in the middleware.
// app.use(function(request, response, next){
//   var query = request.query;

//   if(Object.keys(query).length > 0) {
//     response.status(400).send('You cannot use query strings');
//   } else {
//     next();
//   }
// });

/**
  EXERCISE: MIDDLEWARE
  - Create middleware for the earlier examples to make a log of incoming requests.   Include the original route and a UTC timestamp. Have the log write to a file called "log.txt" in your project directory.
  - Hint: the original route for the request is on request.originalUrl.
**/
app.use(function(request, response, next) {
  // Create timestamp

  // Return the number of milliseconds since 1970/01/01:
  var now = new Date();
  var utcDate = now.toUTCString();

  // create log content
  var logContent = `Original route: ${request.originalUrl}, \nTimestamp: ${utcDate}\n`;

  fs.appendFile('./log.txt', logContent, function(error){

    if (error) throw error;

    console.log('Successfully created a log entry!');
  } );

  next();
});

app.post('/save', function(request, response) {
  response.send('save request received');
});

/**
  EXERCISE: BODY PARSING
    curl -d '{"members":["foo", "baz", bar"]}' -H "Content-Type: application/json" -X POST http://localhost:3000/submit

**/

app.post('/submit', function(request, response) {
  console.log(request.body);

  if(request.body.members.indexOf('foo') < 0) {
    response.status(404).send('uh oh! foo not found in members')
  } else {
    response.send('request received');
  }
});

/**
  EXERCISE: BODY PARSING
  - Create a /checkNumber endpoint
  - Use curl POST to issue a JSON payload to your endpoint ({ "numbers": ["11", "4", "10"] })
  - Check if every number is greater than 10
  - Return an appropriate message if every number is greater than 10
**/
app.post('/checkNumber', function(request, response) {
  var numbers = request.body.numbers;
  for(var i = 0; i < numbers.length; i++) {
    if(numbers[i] <= 10) {
      response.send('There is at least one number less than 10');
    } 
  }

  response.send('All numbers are greater than 10');

});

/**
  MULTIPLE ROUTE NAMES (5 minutes)
**/

app.get(['/hello', '/hi', '/hola'], function(request, response) {
  response.send('hello and hi and hola!');
});


/**
  EXERCISE: ROUTING (10 minutes)
  - Create a route that takes a word as a param and return the word reversed
**/
app.get('/reverse/:word', function(request, response) {
  var word = request.params.word; // 'hello'
  // word.split('') -> ['h', 'e', 'l', 'l', 'o'];
  // word.split('').reverse() -> ['o', 'l', 'l', 'e', 'h']
  // word.split('').reverse().join('') -> 'olleh'
  var reversedWord = word.split('').reverse().join('');

  response.send(reversedWord);

});


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
});

