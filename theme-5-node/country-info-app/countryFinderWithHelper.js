var fs = require('fs');

var countryToFind = process.argv[2];

var readJSONFile = require('./lib/json-file-reader');

readJSONFile('./files/countries.json', function(parsedCountries) {
  for(var i = 0; i < parsedCountries.length; i++) {

    country = parsedCountries[i]; 

    if(countryToFind.toLowerCase() === country.name.toLowerCase()) {

      return console.log(`Country: ${country.name}\nCapital: ${country.capital}`);
    }

  }

  console.log(`Country ${countryToFind} does not exist`);
});
