var fs = require('fs');
var folderPath = './files';

fs.readdir(folderPath, function(error, files){

  if(error) { throw error; }

  // return array of file names
  console.log(files);

  var combinedNames = [];

  // read people1.json
  fs.readFile(folderPath +'/' + files[0], 'utf-8', function(error, data) {

    if(error) { throw error; }

    combinedNames = combinedNames.concat(JSON.parse(data));

    // has people1.json names inside
    console.log('combinedNames', combinedNames)

    // read people2.json
    fs.readFile(folderPath + '/' + files[1], 'utf-8', function(error, data){

      if(error) { throw error; }

      // adding people2.json names to combinedNames
      combinedNames = combinedNames.concat(JSON.parse(data));

      fs.writeFile('./sorted_people.txt',sortNames(combinedNames), function(error){

        if(error) { throw error; }

        console.log('Sorted file successfully created!');

      });
    });
  });
});

function sortNames(arr) {

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

  return arr.sort(function(a, b) {
    a = a.toUpperCase(); // ignore upper and lowercase
    b = b.toUpperCase();

    if(a < b) {
      return -1;
    }

    if(a > b) {
      return 1;
    }

    return 0;
  });
}

