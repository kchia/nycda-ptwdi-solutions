/**
  Introduction to ECMAScript6 (go over slide deck):
  - JavaScript History
  - What is ECMAScript6?
  - Why we have it?

  Documentation:
  - http://es6-features.org

  Using https://repl.it/languages/javascript we'll be going over:
  - let and const
  - Default function parameters
  - Template strings
  - Spread operator
  - Arrow functions
  - Enhanced Object Literals
  - Classes
  - Modules

  Summary:
  These new ES6 features are intended to add capability to the JavaScript language.
  - improve code readability
  - make writing code easier
  
  At times this leads to confusion as now there are two ways of doing the same thing.
  More and more developers are adopting the newer conventions.

  https://github.com/lukehoban/es6features
  http://www.benmvp.com/learning-es6-series
**/

/**
  DEMO BABEL
  https://github.com/nycda-staff/nycda-curriculum/blob/master/lectures/javascript-introduction-to-ecmascript6/03-ecmascript6-babel-setup.md
**/

/**
  LET AND CONST

  ECMAScript6 introduces two new identifiers to be used as an alternative to var: let and const.

  - const: Indicates that the variable should not be reassigned.
  - let: Indicates that the variable may be reassigned.
  - var: should no longer be used 😭

  let and const are all about describing how a program should work and enforcing rules. 
  These new indentifiers give programmers the ability to be more descriptive when writing code and 
  their code is more readable and less bug prone as a result.
**/

/**
  CONST
**/
const animal = "dog";
animal = "cat";
// SyntaxError: Assignment to constant variable: animal

//For consts, primitive types such as strings, integers, and booleans cannot be reassigned
//However, the properties of objects can be!
// AVOID
const animals = {
  cow: 'moo', 
  cat: 'meow'
};
animals.cow = 'quack';
console.log(animals.cow); // quack

/**
  LET
  - The let keyword replaces var
  - The difference is it gives us block level scope in JavaScript
  - Block level scope refers to any code surrounded in curly braces {}
  - Some examples of this is within a for loop, a function or an if-statement
**/
// Using 'var'
// The numbers 1 - 5 will be logged to the console
for (var i = 1; i < 6; i++) {
  console.log(i);
}

// 6 will be logged to the console
// in a block scoped language, i would be undefined
console.log(i);

// Swap var with let to enforce block scope
// The numbers 1 - 5 will be logged to the console
for (let i = 1; i < 6; i++) {
  console.log(i);
}

console.log(i); // ReferenceError: i is not defined

if (true) {
  var a = 1; // we are inside of a block
}

console.log(a); // 1

if (true) {
  let b = 2; // we are inside of a block
}

console.log(b); // ReferenceError: b is not defined

// Variables leaking outside of their relevant scope can lead to bugs that are hard to find.
// You should now use let instead of var and use const when the value should not be reassigned.

/**
  EXERCISE: LET VS CONST
  Write a simple program that calculates the sum of the following array
    [100, 32, 920, 21, 9, 678]
  Think about what variables you will need to define
  Think about when you will use 'const' and when you use 'let' to define the variable.
**/

//https://stackoverflow.com/questions/33040703/proper-use-of-const-for-defining-functions-in-javascript

const sum = (arr) => {
  let result;

  for(let i = 0; i < arr.length; i++) {
    result += arr[i];
  }
  return result;
};

/**
  TEMPLATE STRINGS
**/

const age1 = 20;
const age2 = 30;
let result;

// before ES6 we needed to make sure the quotes are properly
// balanced and the '+' symbols are in the right place
result = 'The Total Age is: ' + (age1 + age2) + '.'

// using ES6 Template Strings
result = `The Total Age is: ${age1 + age2}.`

/**
  SPREAD OPERATOR
  - The spread operator essentially breaks up arrays and objects into pieces
  - Turn elements of an array into arguments of a function call
  - Copy elements of one array into another array
  - Syntax:
      const myArray = [1, 2, 3]

      // use the '...' to activate the spread feature
      ...myArray
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
**/

/**
  SPREAD OPERATOR: Spread with a function call
**/
function getTotalAge(a, b, c) {
  return a + b + c;
}

const agesArray = [41, 82, 36];
getTotalAge(...agesArray) // <- call getTotalAge and break up the array into parts
// results in foo being called with a=41, b=82, c=36

/**
  SPREAD OPERATOR: Spread with copying an array
**/
const newMembers = ['Jane', 'Bob'];
const allMembers = ['Tom', 'Ashley', ...newMembers];

// this results in allMembers being ['Tom', 'Ashley', 'Jane', 'Bob']

/**
  EXERCISE: SPREAD OPERATOR
**/
const agesOne = [23, 83, 12];
const agesTwo = [54, 28, 19];

const allAges = [...agesOne, ...agesTwo];

function subtract(a, b) {
  return Math.abs(a - b);
}

const numbers = [1,2];
subtract(...numbers);

/**
  ARROW FUNCTIONS
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
**/

// ES5
$(document).ready(function(event) {
  
});

// ES6
$(document).ready((event) => {
  
});

//Parenthesis are optional when there is one argument to the function.
// one argument, can have one or no parenthesis
$(document).keypress(event => {
  if (e.which === 13) {
    console.log('You pressed enter!');
  }
});

//They can be used anytime you can use an anonymous function.
$.ajax({
  url: 'api/songs',
  success: response => {
    console.log(response)
  }
});

// Arrow function need curly braces when they have a statement body
// expression bodies don't need curly braces
var squares = [2,3,4].map(x => x * x);
// statement bodies need curly braces
[1,2,3,4].forEach(num => {
  if (num % 2 === 0) {
    console.log(num + ' is an even number');  
  }
});

// Wrap arguments in parenthesis when there are multiple arguments.
// assume we loaded the jQuery library

// no args, just use empty parenthesis
$(document).keypress(() => {
  console.log("You pressed a key. I don't care which one!");
});

// one argument, no parenthesis
$(document).keypress(e => {
  if (e.which === 13) {
    console.log('You pressed enter!');  }
  }
);

// multiple arguments, use parenthesis

// function add (a, b) {
//   return a + b;
}

// var add = (a, b) => {
//   return a + b;
// };

var add = (a, b) => a + b;

//In typical anonymous functions, "this" refers to the global object. Let's look at an example.

var person = {
  name: 'John Doe',
  attributes: ["5'6", 'male'],
  printDescription() {
    this.attributes.forEach(
      function(attribute) {
        // Logs the global object if not in strict mode (Window in a browser)
        // Logs 'undefined' if in strict mode
        // Either way, 'this' is not personconsole.log(this);
        // this.name will be undefined
        console.log(this.name + ' is ' + attribute);
      });
    }
};

// Arrows share the same lexical "this" as their surrounding code.
// We don't need to declare a variable just to access "this" on person.

var person = {
  name: 'John',
  attributes: ["5'6", 'male'],
  printDescription() {
    this.attributes.forEach(attribute => {
      console.log(this.name + ' is ' + attribute);    
    });  
  }
};

person.printDescription();// Jane is 5'5// Jane is female

/**
  EXERCISE: ARROW FUNCTIONS
**/

var arr = [1,2,3,4,5,6,7,8,9,10];

arr.forEach(el => {
  if (el % 2) console.log(el);
});

/**
  DEFAULT FUNCTION PARAM
  - Allows us to optionally define default values for function arguments.
  - Allows us to provide a fallback value to a function or define some default behavior
  - Simplifies our code so that we don't have to constantly be passing the same parameters or checking if a parameter is passed before assigning it a default parameter.
  - See http://es6-features.org/#DefaultParameterValues
**/

const orderCoffee = (coffeeType = 'latte', quantity = 1) => {
  // code that gets the coffee
  console.log(coffeeType, quantity);
};

orderCoffee(); // order my usual coffee
orderCoffee(); // order my usual coffee
orderCoffee('mocha latte'); // it's my bday I want a mocha!
orderCoffee('black coffee', 20); // order enough for the office

/**
  EXERCISE - Default Parameter Values
  // ES5
  function ghostRideThe(thing) {
      if (thing == undefined) {
          thing = 'whip'
      }
      
      console.log("Ghost Ride the " + thing);
  }
**/

const ghostRideThe = (thing = 'whip') => {
  console.log("Ghost Ride the " + thing);
};

/**
  CLASSES
  - For Classes, the difference between ES5 and ES6 is mostly syntax.
  - The functionality is mostly still the same.
  - Let's take at the difference between the syntax of an ES5 and ES6 class.
  var Boy = function(age, name) {
    this.age = age;
    this.name = name;
  };

  Boy.prototype.greetFriend = function(friendName) {
    console.log(`Hi ${friendName}, my name is ${this.name}`)
  };

  var tommy = new Boy(13, 'Tommy');
  tommy.greetFriend('Sally');
**/

class Prescription {
  constructor(drug, quantity) {
    this._drug = drug;
    this._quantity = quantity;  
  }  

  getDrug() {
    return this._drug;  
  }  

  getQuantity() {
    return this._quantity;  
  }
}

let rx = new Prescription('amoxicillin', 30);
rx.getDrug(); // amoxicillin


/**
  Classes can extend other classes, inheriting their properties and methods.
**/

class Controller {
  constructor(urlPrefix = '') {
    this._urlPrefix = urlPrefix;  
  }  

  getUrlPrefix() {
    return this._urlPrefix;
  }
}

class UsersController extends Controller {
  constructor(urlPrefix = 'users') {
    super(urlPrefix); // call parent constructor or urlPrefix won't be set!
  }
}

let usersController = new UsersController;
usersController.getUrlPrefix(); // users

/****/

class Boy {
  constructor(age, name) {
    this.age = age;
    this.name = name;
  }

  greetFriend(friendName) {
    console.log(`Hi ${friendName}, my name is ${this.name}`)
  }
}

const tommy = new Boy(13, 'Tommy');
tommy.greetFriend('Sally');


/**
  EXERCISE - CLASSES
    - Define a class called Rectangle
    - The constructor function should take two arguments: width and height
    - Define a function called calculatePerimeter()
    - Define a function called calculateArea()
    - Create a Rectangle instance and call both functions
**/


/**
  MODULES: DEFAULT
  - present slide deck

  - ES6 modules have named exports and default exportsWhen you export something, 
  you expose it to the script that imports it. 

  - You've probably seen a script imported via requirein Node.js

  - ES6 uses the keyword import instead of require
  
  - Modules allow you to write code in any scope you want inside of a file and 
  then only export one value, ensuring you do not expose anything else to the script that imports it.

  - Named exports are used when you want to expose several values or objects from a script

  - Default exports are used when you want to export only one object or value from a script

  - It is considered best practice to export only one value so you will primarily be using default exports
**/

/**
  MODULES: DEFAULT EXPORTS
  - To export more than one value, simply add the export keyword in front of the declaration.
**/
// Person.js
let foo = 'bar';
export default class Person {
  // class code here...
}

// main.js
import Person from'./Person';
console.log(foo); // undefined
console.log(Person); // class Person {}

/**
  MODULES: NAMED EXPORTS
  - To export more than one value, simply add the export keyword in front of the declaration.
**/
// FILE: player.js
export const maxPlays = 5;
export function run() {
  // make player run
}
export function jump() {
  // player jump
}

// FILE: main.js
import { maxPlays, jump } from'./player';// import only maxPlays and jump

import * from'./player'// import everything that player exposes (maxPlays, run, jump)


/**
  WORKSHOP PROBLEM
**/

