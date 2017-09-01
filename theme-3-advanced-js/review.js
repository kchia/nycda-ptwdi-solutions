
// There should be a problem with our code because for some reason 
// I only see 'Ernie loves his Rubber Duck' when I expected
// to see 'Bert loves his Pidgeons', could you help me?

var bird = 'Pidgeons';

function saySomething() { 
  if ( typeof bird === 'undefined' ){

     bird = 'Rubber Duck';
    console.log('Ernie loves his ' + bird );

  } else {

    console.log('Bert loves his ' + bird );

  }
}

saySomething();

// SOLUTION:
var bird = 'Pidgeons';
function saySomething() {
  if ( typeof bird === 'undefined' ){

    bird = 'Rubber Duck';
    console.log('Ernie loves his ' + bird );

  } else {

    console.log('Bert loves his ' + bird );
    
  }
}
