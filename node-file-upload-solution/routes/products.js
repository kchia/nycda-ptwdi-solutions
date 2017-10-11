var express = require('express');
var multer = require('multer');
var sharp = require('sharp');

var router = express.Router();

var products = require('../models/products');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../public/images/user-images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
  }
});

var upload = multer({ storage: storage })

router.get('/create', function(req, res, next) {
	res.render('product/create', {title: 'User Image Create', nav: 'Create'})
});

router.post('/create', upload.single('productImage'), function(req, res, next) {

	//call the sharp() function passing in the image we want to resize
	sharp(__dirname + '/../public/images/user-images/' + req.file.filename)

	// ignoreAspectRatio will not crop the image to fit the desired size
	.ignoreAspectRatio()

	// resize image to these dimensions (w x h) in pixels
	.resize(200, 200)

	// specify where to save the result
	.toFile(__dirname + '/../public/images/user-images/thumbnails/' + req.file.filename, (err, info) => {
		products.addProduct(req.body, req.file.filename)
		res.redirect('/');
	});
});

router.get('/:id', function(req, res, next) {
	var product = products.findById(req.params.id);
	res.render('product/show', {product: product, title: 'Product Details', nav: 'Product'})
});


module.exports = router;
