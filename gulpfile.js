var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jshint');
var util = require('gulp-util');

gulp.task('vet', function() {
	log('Analyzing with jshint and jscs');
    return gulp
        .src([
            './*.js'
        ])
        .pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish',{verbose: true}));

});



function log (msg){
	util.log(util.colors.blue(msg));
}