const 	gulp        	= require('gulp'),
		browserSync 	= require('browser-sync').create();

gulp.task('sync', function(){
	let obj = {};
	obj.server = {
		baseDir: './'
	};
	browserSync.init(obj);
});
