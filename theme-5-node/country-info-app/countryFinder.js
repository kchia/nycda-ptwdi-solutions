var fs = require('fs');

function readJSONFile(filepath, callback){

  fs.readFile(filepath, 'utf-8', function(err, data) {

    if (err) throw err;

    var parsed = JSON.parse(data);

    // after parsing is finished, execute the callback
    callback(parsed);   
  });

}

module.exports = readJSONFile;
