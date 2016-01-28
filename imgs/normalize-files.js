var walk = require('walk');
var fs = require('fs');
var files = [];
var _ = require('underscore');

// Walker options
var walker = walk.walk('./', {
	followLinks: false
});

walker.on('file', function (root, stat, next) {
	// Add this file to the list of files
	files.push(root + '/' + stat.name);
	next();
});

walker.on('end', function () {
	console.log(files);

	_.each(files, function (file) {
		console.log(file)
		fs.rename(file, file.toLowerCase().replace(/\s+/g, "-")
			.replace("ç", "c")
			.replace("â", "a")
			.replace("é", "e"), function (err) {
				if (err) console.log('ERROR: ' + err);
			});
	})
});