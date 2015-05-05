var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),
	minifyCSS = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	merge = require('merge-stream'),
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
 
 
gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: './demo'
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});


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


gulp.task('copy-demo', ['js', 'sass'], function () {
	
	var scrips = gulp.src(config.dist+'/*.min.js')
		.pipe(gulp.dest(config.demo+'/js'))
		.pipe(browserSync.reload({stream:true}));
	
	var styles = gulp.src([
			config.dist+'/*.min.css',
			config.dist+'/*.map'
		])
		.pipe(gulp.dest(config.demo+'/css'))
		.pipe(browserSync.reload({stream:true}));
	
	return merge(scrips, styles);
});


/****************************
	USER  TASKS
****************************/

//Build: Dist
gulp.task('default', ['js', 'sass']);


//Buld: Demo
gulp.task('build-demo', ['copy-demo']);

//Demo
gulp.task('demo', ['copy-demo', 'browser-sync'], function(){
	gulp.watch(config.src+'/*.+(js|scss)', ['copy-demo', 'bs-reload']);
});
 
 

