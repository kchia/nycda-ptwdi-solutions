console.log(this);

/********************/

function func() {
 console.log(this);
}

func();

/********************/

var person = {
  firstName: "Penelope",
  lastName: "Barrymore",
  fullName: function () {
   console.log('what does this look like:' + this)
    console.log(this.firstName + " " + this.lastName);
    console.log(person.firstName + " " + person.lastName);
  }
};

person.fullName();

/*********************/

var firstName = "Peter";
var lastName = "Ally";

var person = {
  firstName   :"Penelope",
  lastName    :"Barrymore",
  showFullName: function () {
   console.log (this.firstName + " " + this.lastName);
  }
}

function showFullName () {
  console.log(this.firstName + " " + this.lastName);
}

showFullName(); // Peter Ally
window.showFullName(); 
person.showFullName(); 

/****************/


var user = {

  tournament: "The Masters",

  data: [
    {
      "name": "T. Woods",
      "age": 37
    },
    {
      "name": "P. Mickelson", 
      "age": 43
    }
  ],

  clickHandler: function () {

    console.log('outer function:' + this); // user

    // // Without proper context binding 
    // this.data.forEach(function (person) {
    //   console.log('inner function:', this);
    //   console.log (person.name + " is playing at " + this.tournament);
    // });

    // With proper context binding
    this.data.forEach(function (person) {
      console.log('inner function:', this);
      console.log (person.name + " is playing at " + this.tournament);
    }.bind(this));
  }
};

user.clickHandler();

/**********************************/
// Example of a function losing context when
// invoked with a delay

var name = 'John';
var obj = {
    name: 'Mary',
    whoIam: function() {
      var name = 'James';

      console.log( this.name );

      // var history = this;
      setTimeout(function() {
        console.log(this.name);
        // console.log( history.name );
      }, 100);
    }
  };

obj.whoIam();

/*************************************/

// What will the code below output to the console and why?
var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        function anotherFunc() {
            console.log(this)
            console.log("inner func:  this.foo = " + this.foo);
            console.log("inner func:  self.foo = " + self.foo);
        };
        anotherFunc();
    }
};

myObject.func();

// outer func:  this.foo = bar
// outer func:  self.foo = bar
// Window {stop: ƒ, open: ƒ, alert: ƒ, confirm: ƒ, prompt: ƒ, …}
// inner func:  this.foo = undefined
// inner func:  self.foo = bar



















