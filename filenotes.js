fs.readFile("test.txt", "utf8", function(err, data) {
  console.log(data);
});
fs.writeFile("test.txt", "Hy", function(err, data) {
	console.log("Hy saved into the file");
});
fs.appendFile("test.txt", "Hy", function(err, data) {
	console.log("Hy appended to file");
});
fs.readFile("test.txt", 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(your-regex-or-text,replacement-text);
    fs.writeFile(filePath, result, 'utf8', function(err) {
        if (err) {
           return console.log(err);
        };
    });
});

//new file
fs.closeSync(fs.openSync(filepath, 'w'));

//searching dir
var glob = require("glob");

// options is optional
glob("**/*.js", options, function (er, files) {
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.
});