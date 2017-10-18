var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");

// Load DB config from config file
var config = require(path.join(__dirname, 'config', 'config.js'));

// Init sequelize with params from config file
console.log('Create sequelize...');
var sequelize = new Sequelize(config.database, config.username, config.password, config);

// Empty db object to hold our models
var db = {};

fs.readdirSync(path.join(__dirname, 'models'))
.filter(function(file) {
	// load all files except index.js (this file)
	return (file.indexOf(".") !== 0) && (file !== "index.js");
})
.forEach(function(file) {
	// For every model file, add the model to our db object
	var model = sequelize.import(path.join(__dirname, 'models', file));
	db[model.name] = model;
});

// Loop through models and check for the associate method.
// If the associate method exists, call it.
// The associations defined in our models will then initialized.
Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

// Use sequelize with uppercase or lowercase
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;