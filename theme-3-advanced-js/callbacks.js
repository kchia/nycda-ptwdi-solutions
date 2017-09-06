var clientData = {
  id: 094545,
  fullName: "Not Set",
  // setUserName is a method on the clientData object​
  setUserName: function (firstName, lastName)  {
    // this refers to the fullName property in this object​
    this.fullName = firstName + " " + lastName;
  }
}

function getUserInput(firstName, lastName, callback)  {
  callback (firstName, lastName);
}

getUserInput("John", "Davis", clientData.setUserName.bind(clientData));

console.log("clientData:", clientData.fullName);