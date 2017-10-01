/**
  OBJECT RELATIONAL MAPPING (ORM)
    - A way to access and manipulate your database without having to write SQL queries
    - ORMs generate SQL queries for you based on your JavaScript data model
    - Allows you to focus mainly on JavaScript code
    - This can cut down on SQL typos and mistakes and speed development
**/
  
/**
  SEQUELIZE
  - http://sequelize.readthedocs.io/en/latest/
  - Promise based ORM for NodeJS
  - Read from, write to, and modify PostgreSQL tables with JavaScript
  - npm install --save sequelize
  - createuser -s -r postgres
**/

var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://houchia@localhost:5432/cap_app');

// Defining the cap model
var Cap = sequelize.define('cap', {
  name: Sequelize.STRING, // not the same Sequelize.string
  material: Sequelize.STRING,
  height: Sequelize.INTEGER,
  brim: Sequelize.BOOLEAN
});

Cap
  .sync() //ensure the table exists
  .then(function(){
    Cap.create({
      name: 'cowboy',
      material: 'straws',
      height: 4,
      brim: true
    });

// INSERT INTO "hat" ("id", "name", "material", "height", "brim")
//  VALUES (DEFAULT,"cowboy", "straw", 4, 1);
  }) 


// CREATE TABLE users (
//     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255) NOT NULL
// );

// CREATE TABLE posts (
//     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     user_id INT(11) NOT NULL, /* References users.id NOT UNIQUE */
//     title VARCHAR(255),
//     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE /* FOREIGN KEY CONSTRAINT */
// );

var User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

var Post = sequelize.define('post', {
  // user_id: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: User,
  //     key: 'id'
  //   }
  // },
  title: Sequelize.STRING
});

User.sync().then(function(){
  User.create({
    name: 'Hou Chia'
  });

  User.create({
    name: 'David'
  });

  User.create({
    name: 'Mark'
  });
});

Post
  .sync()
  .then(function(){
    Post.create({
      title: 'Hou Chia\'s First Blog Post',
      user_id: 1
    });

    Post.create({
      title: 'Hou Chia\'s Second Blog Post',
      user_id: 1
    });

    Post.create({
      title: 'Hou Chia\'s Third Blog Post',
      user_id: 1
    });
});

User.hasMany(Post);
Post.belongsTo(User);

Post.findAll().then(function(rows) {
  console.log(rows);
});

User.findById(1).then(function (row) {
  console.log(row);
});
// SELECT * FROM users WHERE id = 1

/**
  EXERCISE: EXPRESS
**/
var express = require('express');
var app = express();

app.get('/posts', function(request, response) {
  Post.findAll().then(function(rows) {
    response.send(rows);
  })
});

app.get('/users', function(request, response) {
  User.findAll().then(function(rows) {
    response.send(rows);
  })
});

app.get('/users/:name', function(request, response) {
  User.findAll({
    where: {
      name: {
        ilike: `%${request.params.name}%`
      }
    }
  })
  .then(function(rows){
    response.send(rows);
  });
});

/**
  EXERCISE: Add an Express route to find and return all posts containing a search term
**/

/* 
Use a query string parameter for the search term like:
   /posts/search?term=sometext
*/
app.get('/posts/search', function (request, response) {

  var query  = request.query.term;

  // your query code here
  Post.findAll({
    where: {
      title: {
        ilike: `%${query}%`
      }
    }
  })
  .then(function(rows){
    response.send(rows);
  });

});

app.listen(3002, function () {
  console.log('Example app listening on port 3002!');
});
