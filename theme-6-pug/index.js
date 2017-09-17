// mkdir theme-6-pug
// cd theme-6-pug
// npm init
// npm install --save express
// npm install --save pug
var express = require('express');
var app = express();

app.set('view engine', 'pug');

// Look for templates in my-views folder; otherwise,
// look for templates in views folder
app.set('views', './my-views');

app.get('/', function(request, response){

  var data = {
    groceries: [
      {
        store: 'Acme',
        list: [
          'strawberries',
          'blueberries',
          'yogurt'
        ]
      }, 
      {
        store: 'Corner Market',
        list: [
          'baguette',
          'basil',
          'tomatoes'
        ]
      }
    ]
  };
  response.render('list', data);
});

app.listen(3000, function() {
  console.log('App is listening on port 3000');
})