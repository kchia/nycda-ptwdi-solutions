var fs = require('fs');
var Promise = require('promise');
var folderPath = './files';

fs.readdir(folderPath, function(error, files) {

  if(error) throw error;

  // Step 1: Create an array of promises
  var fileReadPromises = [];
  var promise;

  // iterate through files
  files.forEach(function(file){
    // create a promise from each file read operation
    promise = readFilePromise(`${folderPath}/${file}`);

    // push the promise into promises array
    fileReadPromises.push(promise);
  });

  // wait for all promises to resolve before
  // writing file to people_sorted.txt
  Promise
    .all(fileReadPromises)
    .then(function(data) {

      // an array of arrays; each one is an
      // array of names
      console.log(data);

      fs.writeFile('./people_sorted.txt', sortNames(data), function(error) {
          if(error) throw error;

          console.log('Merged file successfully completed');
      })
    })

});

/**
  Helper methods
**/
function readFilePromise(path) {
  return new Promise(function(resolve, reject){
    fs.readFile(path, 'utf-8', function(error, data) {

      if(error) {
        reject(error);
      } else {
        // if successful
        resolve(JSON.parse(data));
      }

    })
  })
}

function sortNames(arr) {
  var combinedNames = [];

  arr.forEach(function(names) {
    combinedNames = combinedNames.concat(names);
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

  var sortedNames = combinedNames.sort(function(a, b){

    a = a.toUpperCase(); // ignore upper and lowercase
    b = b.toUpperCase(); // ignore upper and lowercase

    if(a < b){
      return -1;
    }
    
    if(a > b){
      return 1;
    }

    return 0;
  });

  return sortedNames;
}
