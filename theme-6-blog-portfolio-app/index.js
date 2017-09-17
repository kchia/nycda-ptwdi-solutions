var express = require('express');
var app = express();

app.set('view engine', 'pug');

app.get('/', function(request, response){
  response.render('index');
});

app.get('/portfolio/:projectId', function(request, response) {

  var projects = {
    1: 'SoundCloud',
    2: 'Instagram Clone',
    3: 'Rotten Tomatoes',
    4: 'Final Project'
  }

  var data = {
    projectTitle: projects[request.params.projectId]
  };

  response.render('portfolio', data);
});

//have the application listen on a specific port
// navigate to http://localhost:3000/
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});