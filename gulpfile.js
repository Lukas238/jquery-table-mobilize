var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),
	minifyCSS = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	
    package = require('./package.json');
 
     
var config = {
    src: './src',
    dist: './dist',
	demo: './demo'
}
 
var banner = [
  '/*!\n' +
  ' * <%= package.name %>\n' +
  ' * <%= package.description %>\n' +
  ' * @URL <%= package.repository.url %>\n' +
  ' * @author <%= package.author %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */',
  '\n'
].join('');
 

gulp.task('js',function(){
  return gulp.src(config.src+'/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest(config.dist))
    .pipe(uglify())
    .pipe(header(banner, { package : package }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.dist));
});

gulp.task('sass', function () {
	return gulp.src(config.src+'/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({errLogToConsole: true}))
	.pipe(autoprefixer('last 4 version'))
	.pipe(gulp.dest(config.dist))
	.pipe(minifyCSS())
	.pipe(rename({ suffix: '.min' }))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(config.dist));
});


/****************************
	USER  TASKS
****************************/

//Build
gulp.task('default', ['js', 'sass']);

//Demo
gulp.task('demo', ['js', 'sass'], function(){
	gulp.src(config.dist+'/*.min.js')
	.pipe(gulp.dest(config.demo+'/js'));
	
	gulp.src(config.dist+'/*.min.css')
	.pipe(gulp.dest(config.demo+'/css'));
});
 
 

