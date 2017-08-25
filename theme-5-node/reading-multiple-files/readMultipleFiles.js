var fs = require('fs');

fs.readdir('./files/', function(err, files){

  if(err) throw err;

  var file;

  // keep track of how many files still remain to be read
  var remaining = files.length;

  var totalFilesRead = 0;

  for(var i = 0; i < files.length; i++ ) {
    file = files[i];

    console.log(file);

    fs.readFile(`./files/${file}`, 'utf-8', function(err, data){

      if (err) throw err; 

      console.log(`Successfully read a file: ${data}`);
      
      totalFilesRead += 1;

      remaining -= 1;

      if(remaining === 0) {
        console.log(`Done reading files. Files Read: ${totalFilesRead}`);
      }

    });
  }
});