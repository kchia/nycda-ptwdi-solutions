/**
  - Routes helps to keep the files modular
  
  - What exactly is the Express Router? It is a mini express
  application without all the bells and whistles of an express
  application, just the routing stuff.
  Let's take a look at exactly what this means.
  We'll go through each section of our site and
  use different features of the Router.

  - Using the Router, we are allowed to make our applications more 
  modular and flexible than ever before by creating multiple 
  instances of the Router and applying them accordingly. 
**/


var express = require('express');

// get an instance of router
var router = express.Router();
var products = require('../models/products');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Product Uploader' , products: products.productList, nav: 'Home'});
});

module.exports = router;
