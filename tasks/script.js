/**
 * Script Compiler
 */
var gulp 		= require('gulp')
,	browserify 	= require('browserify') 	 	 // Magic with browserify
,	source		= require('vinyl-source-stream') // Source Stream
//,	coffee 		= require('gulp-coffee')		 // Coffee yummy
,   streamify   = require('gulp-streamify')
,	uglify 		= require('gulp-uglify')		 // I am handsome :)
,   util 		= require('gulp-util')
;

gulp.task('script', ['env'], function (done) {
	var c = global.configs || {};

	util.log("PROCESS >>> " + util.colors.green('SCRIPT'));
	
	// Browserify config
	var Brorify =  browserify({
		entries		: [c.src_dir + c.script_dir + '/main']
	,	extensions	: ['.js']
	,	debug		: true	
	});

	// Lets bundle all
	var bundle = function() {
		return Brorify
		.bundle()
		.on('error', function(err) {
			util.log(util.colors.red('ERROR') + ' >>> ' + err);
			this.emit('end');
		})
		.pipe(source('main.js'))
//		.pipe(streamify(uglify({
//			mangle: false // prevent ugly vars
//		})))
		.pipe(gulp.dest(c.target_dir + c.script_dir))
		.on('update', bundle)
		.on('end', function() {
			util.log("SUCCESS compile " + util.colors.green('SCRIPT'));
		});
	}

	return bundle();
});