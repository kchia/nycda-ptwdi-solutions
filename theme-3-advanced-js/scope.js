/**
Scope describes the parts of your program where variables can be accessed
without an error. In JavaScript, scope depends on where your variable is defined.
*/

function test() {
   console.log('a:', a);
   console.log('foo:', foo());
   console.log('bar():', bar());
   console.log('bar:', bar);
   
   var a = 1;

   function foo() {
      return 2;
   }

   var bar = function () {
     return 3;
   }

}

test();

/***********************/
var text = 'outside';

function logIt() {
  var text;
  console.log(text);
  text = 'inside';
}

logIt(); // undefined
/***********************/

function assign() {
  var cat = dog = 5;
}

assign();

console.log('cat:', cat);
console.log('dog:', dog);

/***********************/
// A variable declaration simply tells the interpreter that a variable exists. 
// By default it initializes the variable to undefined:
var unicorn;

console.log(unicorn);  // logs undefined (NOT a ReferenceError)

// A variable assignment assigns a value to the variable:
unicorn = 'Sparkles McGiggleton';

// We can both declare and assign in the same line:
var centaur = 'Horsey McPersonhead';

/***********************/

var globalVar = "xyz";

function outerFunc(outerArg, innerArg) {
  var outerVar = 'a';
  
  function innerFunc() {
    var innerVar = 'b';
    
    console.log( 
      "outerArg = " + outerArg + "\n" +
      "innerArg = " + innerArg + "\n" +
      "outerVar = " + outerVar + "\n" +
      "innerVar = " + innerVar + "\n" +
      "globalVar = " + globalVar);
    
  };

  innerFunc();
};

outerFunc(123, 456);
// outerArg = 123
// innerArg = 456
// outerVar = a
// innerVar = b
// globalVar = xyz

/**************************************/

var grapefruit = 1;

function outerFunction() {
 var apple = 2;

 function innerFunction() {
  var orange = 3;

  // here we have access to variables 'grapefruit', 'apple', and 'orange'
  console.log(grapefruit + ' ' + apple + ' ' + orange);
 }

 innerFunction();
}

outerFunction();
// in the global scope, we have access only to 'grapefruit'

/**********************/
function outsideFunction() {
 function insideFunction() {
   console.log('hi');
 }
 insideFunction();
}

outsideFunction();
insideFunction();

/**********************/

// if statement does not create its own scope
if(true) {
 var varInIf = 'inside an if statement';
}

console.log(varInIf);

/**********************/

var word = 'hello!';

function sayWord () {
  // sayWord's local scope in between curly braces
  var anotherWord = 'hello again'; // defined in the local scope of sayWord
  console.log(word);
}

function sayAnotherWord () {
 // local scope of sayAnotherWord does not have var anotherWord
 console.log(anotherWord);
}

sayAnotherWord();

