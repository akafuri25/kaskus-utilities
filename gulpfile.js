/**
 * GULP TASK WATCHER
 * @author Naufal @engga_enak
 */

var gulp 		= require('gulp')
,   sequence 	= require('run-sequence')
,	util 		= require('gulp-util')
,	watch 		= require('gulp-watch')
;

/** ------------------------------------------------- -
 * Gulp external task
 * -------------------------------------------------- */
require('./tasks/script'); 	// Script
require('./tasks/style'); 	// Style (SASS)

/** ------------------------------------------------- -
 * GULP ENV - Environment variables goes here
 * -------------------------------------------------- */
gulp.task('env', function(done) {
	var config = {
		src_dir 	: './source/'
	,	target_dir 	: './dist/assets/'
	,	script_dir	: 'js'
	,	sass_dir	: 'sass'
	,	style_dir	: 'css'
	,	dev 		: false
	};

	global.configs = config;
	if (util.env.dev) {
		global.configs.dev = true;
		var state = 'DEVELOPMENT';
	} else {
		var state = 'PRODUCTION';
	}

	util.log("START >>> " + util.colors.green(state));

	return done();
});

/** ------------------------------------------------- -
 * GULP DEFAULT TASK
 * -------------------------------------------------- */
gulp.task('default', function(done) {

	if (util.env.dev) {
		util.log(util.colors.yellow("-------- GULP IS RUNNING IN DEVELOPMENT MODE --------"));
		util.log("- All Script, css and images return as same");
	} else {
		util.log(util.colors.yellow("-------- GULP IS RUNNING IN PRODUCTION MODE --------"));
		util.log("- Scipt returned as Uglify");
		util.log("- CSS compact mode");
		util.log("- Images will minify");
	}

	sequence(
		['script', 'style', 'env']
	,	['watch']
	,	done
	);
});

/** ------------------------------------------------- -
 * GULP WATCH
 * -------------------------------------------------- */
gulp.task('watch', ['env'], function () {
	var c = global.configs || {};

	watch(c.src_dir + c.script_dir + '/**/*.js', function (files, cb) {
		gulp.start('script', cb);
	});
	watch(c.src_dir + c.sass_dir + '/**/*.scss', function (files, cb) {
		gulp.start('style', cb);
	});
});