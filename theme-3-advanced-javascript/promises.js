/**
  WHAT ARE PROMISES?

  - A Promise represents a proxy for a value not necessarily known when the 
  promise is created.

  - It allows you to associate handlers to an asynchronous action's eventual 
  success value or failure reason. 

  - This lets asynchronous methods return values like synchronous methods: 
  instead of the final value, the asynchronous method returns a promise of 
  having a value at some point in the future. 

  - Allows you to create functions that return a value that does not exist yet

  - Gives you a way to create easy to read asynchronous code

  - Wraps asynchronously executing code into chains of function calls to make 
  things more legible

  - Simplifies error handling and error bubbling

 PROMISE STATES:
  - pending: The initial state of a Promise upon creation.
  - fulfilled: The pending operation has completed successfully.
  - rejected: The pending operation failed.
  - resolved: a promise that has fulfilled a value
  - settled: a promise that has either been fulfilled or rejected

DOCUMENTATION:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
  - https://scotch.io/tutorials/javascript-promises-for-dummies
  - https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261
  - https://www.toptal.com/javascript/javascript-promises
**/

/**
  PROMISE.THEN() & PROMISE.CATCH()
**/

var helloWorldPromise = new Promise(function(resolve, reject){

  // resolve the promise with a message
  setTimeout(function() {
    resolve('hello world');
  }, 1000);

  // // reject the promise with an Error
  // setTimeout(function() {
  //   reject('hello error world');
  // }, 1000);

});

// All promise instance get a .then() method that allow you 
// to handle promise resolution. Once a promise is fulfilled (when resolve is called), the fulfillment value is passed to the .then() handler
helloWorldPromise.then(function(result){
  
  console.log(result);
  return result;
  
}, function(error) {
  
  console.log('I can throw errors too!');

// All promise instances also get a .catch() method that allow you to handle promise rejection
// The .catch() callback receives the result given by what was passed to the promise's reject  
}).then(function(result) {

  console.log(`${result} there`);
  
  return Promise.resolve(result);

}).catch(function(error){
  
  console.log('Error!');
  
});

/**
  FUNCTION COMPOSITION/CHAINING
  - Chaining allows Promises to allow for more complex behavior
  - Note that values must be returned from the .then() handler
  - Returned values can be promises or any other object, function, or primitive
**/
var promise = Promise.resolve('hello')
  .then(function(str) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(`${str} there`);
      }, 1000);
    });
  }).then(function(str) {
    return `${str} world!`;  
  }).then(function(str) {
    //prints "hello there world!"
    console.log(str);
    //the `promise` variable above will eventually
    //be a fulfilled promise with `str` as its value
    return Promise.resolve(str);
  });

/**
  PROMISE.ALL
  - Waits for all promises to finish
  - Returns a promise, so it is chainable, just like .then()and .catch()
  - Results will be an array in the same order as the array given to .all()
**/
var promise1 = Promise.resolve('one');

var promise2 = new Promise(function(resolve, reject) {  
  setTimeout(function() {
    resolve('two, with some time');
  }, 2000);
});

var promise3 = new Promise(function(resolve, reject) {
  resolve('three');
});

//create an array.  We're going to use this array like a queue.
var promises = [promise1, promise2, promise3];

//`Promise.all` waits for all of the promises to complete
Promise.all(promises).then(function(results) {
  //prints ['one', 'two, with some time', 'three']
  //this will happen after 2 seconds as `promise2`
  //takes time to resolve
  console.log(results);  
});
