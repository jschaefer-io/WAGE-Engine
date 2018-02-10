'use strict';

let sys =  require('util'),
	exec = require('child_process').exec,
	os = require('os'),
	puts = (error, stdout, stderr) => {
		console.log(stdout);
	};

if (os.type() === 'Windows_NT'){
	exec("start npm run sync", puts);
	exec("start npm run watch", puts);
}
else{
	exec("npm run sync & npm run sync", puts);
}