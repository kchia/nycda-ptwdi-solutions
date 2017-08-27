/** PLANNING */

// We need to import Elevator and Passenger classes

// 3 passengers with names and floors, array

// Elevator Class
	// should extend EventEmitter class
	// params: currentPassenger, currentFloor
	// methods: loadPassenger, unloadPassenger, goUp, goDown
		// 1 second delay between floors
	// respond to "up" and "down" 

// Passenger Class
	// params: name, desiredFloor

/** CODING */
var Passenger = require('./passenger.js');

// native node module
var EventEmitter = require('events');

// console.log(new Passenger('hello', 4));
var john = new Passenger('John', 3);
var sally = new Passenger('Sally', 4);
var david = new Passenger('David', 8);

var passengers = [
	john,
	sally,
	david
];

function Elevator (currentPassenger, currentFloor) {
 	// set a default with OR
	this.currentPassenger = currentPassenger || {};

	this.currentFloor = currentFloor || 0;
}

Elevator.prototype = new EventEmitter();


Elevator.prototype.loadPassenger = function(passenger) {
	console.log(`Loading passenger ${passenger.name} at floor ${this.currentFloor}`);
	this.currentPassenger = passenger;
	this.emit('up');
};

Elevator.prototype.unloadPassenger = function() {
	console.log(`Unloading ${this.currentPassenger.name} at floor ${this.currentFloor}`);
	this.currentPassenger = {};
	this.emit('down');
};

Elevator.prototype.goUp = function() {
	console.log(`Elevator taking ${this.currentPassenger.name} up, currently at floor ${this.currentFloor}`);
	this.currentFloor++;
};

Elevator.prototype.goDown = function() {
	console.log(`Elevator going down, currently at floor ${this.currentFloor}`);
	this.currentFloor--;
};

var elevator = new Elevator();

// console.log(elevator);
elevator.on('up', function() {

	setTimeout(function() {
		// keep going up until we reach the desired floor

		// every time, we go up a floor, check if it is the desired floor
		if(this.currentFloor === this.currentPassenger.desiredFloor) {
			// unload passenger
			this.unloadPassenger();
		// if not desired floor,?
		} else {
			// keep going up
			this.goUp();
			this.emit('up');

		}
	}.bind(this), 1000);

});

elevator.on('down', function() {
	setTimeout(function() {
		// keep going down until we reach the lobby
		if(this.currentFloor !== 0) {
			this.goDown();
			this.emit('down');
		} else {
			// we are in the lobby
			var nextPassenger = passengers.pop();

			if(nextPassenger) {
				this.loadPassenger(nextPassenger);
			} else {
				console.log('No more passengers. We are back at floor ' + this.currentFloor);
			}
		}

	}.bind(this), 1000);

});

elevator.loadPassenger(passengers.pop());






























