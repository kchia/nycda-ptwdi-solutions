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
			material: 'straw',
			height: 4,
			brim: true
		});


// INSERT INTO "hat" ("id", "name", "material", "height", "brim")
//  VALUES (DEFAULT,"cowboy", "straw", 4, 1);
	}) 







