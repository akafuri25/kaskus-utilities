/**
 * Style compiler (scss)
 */
var gulp 			= require('gulp')
,	sass 			= require('gulp-sass')
,	autoprefixer 	= require('gulp-autoprefixer')
,	util 			= require('gulp-util')
//,	sourcemaps 		= require('gulp-sourcemaps')
;

gulp.task('style', ['env'], function() {
	var c = global.configs || {};
	var sassOption = {
		errLogToConsole: true
	};

	util.log("PROCESS >>> " + util.colors.green('STYLE'));

	if(!c.dev) {
		sassOption.outputStyle = 'compressed';
	}

	return gulp.src(c.src_dir + c.sass_dir + '/main.scss')
//		.pipe(sourcemaps.init())
		.pipe(sass(sassOption))
		.pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
//		.pipe(sourcemaps.write('./'))
		.on('error', function(err) {
			util.log(util.colors.red('ERROR') + ' >>> ' + err);
			this.emit('end');
		})
		.pipe(gulp.dest(c.target_dir + c.style_dir))
		.on('end', function() {
			util.log("SUCCESS compile " + util.colors.green('STYLE'));
		});
	;

})