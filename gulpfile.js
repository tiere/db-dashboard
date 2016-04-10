'use strict';

var argv         = require('yargs').argv;
var autoprefixer = require('gulp-autoprefixer');
var babelify     = require('babelify');
var browserify   = require('browserify');
var buffer       = require('vinyl-buffer');
var cleanCSS     = require('gulp-clean-css');
var concat       = require('gulp-concat');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var sass         = require('gulp-sass');
var source       = require('vinyl-source-stream');
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify');

gulp.task('default', function () {
  gulp.start('styles', 'scripts', 'fonts');
});

gulp.task('watch', ['styles', 'scripts', 'fonts'], function () {
  gulp.watch('./assets/stylesheets/**/*.scss', ['styles']);
  gulp.watch('./assets/javascripts/**/*.js', ['scripts']);
  gulp.watch('./assets/fonts/bootstrap/*', ['fonts']);
});

gulp.task('styles', function () {
  return gulp.src('./assets/stylesheets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('all.css'))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('scripts', function () {
  var b = browserify({
    entries: ['./assets/javascripts/main.js'],
    debug: true
  });

  b.transform(babelify, { presets: ['es2015', 'react'] });

  return b.bundle()
    .pipe(source('all.js'))
    .pipe(buffer())
    .pipe(gulpif(!argv.production, sourcemaps.init({ loadMaps: true })))
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulpif(!argv.production, sourcemaps.write('./')))
    .pipe(gulp.dest('./public/javascripts'));
});

gulp.task('fonts', function () {
  return gulp.src('./assets/fonts/bootstrap/*')
    .pipe(gulp.dest('./public/fonts/bootstrap'));
});
