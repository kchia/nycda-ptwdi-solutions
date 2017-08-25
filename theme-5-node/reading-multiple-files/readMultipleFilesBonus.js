var fs = require('fs');

// make sure to run `npm install promise` from command line
var Promise = require('promise');

// Wrap the io functions with ones that return promises.
var readdirPromise = Promise.denodeify(fs.readdir);
var readFilePromise = Promise.denodeify(fs.readFile);

// read the files directory
readdirPromise('./files/').then(function(files) {

  // Create an array of promises
  var promises = [];

  var file;

  for (var i = 0; i < files.length; i++) {
    file = `./files/${files[i]}`;		
    promises.push(readFilePromise(file));
  }

  Promise.all(promises).then(function(results) {
      console.log(`Done reading ${results.length} files: ${results}`);
  }, function(error) {
      console.log(`Error reading files: ${error}`);
  });

}, function(error) {
    console.log( `readdir failed: ${error}`);
});
