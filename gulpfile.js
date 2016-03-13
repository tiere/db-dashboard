(function () {
  'use strict';

  var cleanCSS = require('gulp-clean-css');
  var concat   = require('gulp-concat');
  var gulp     = require('gulp');
  var sass     = require('gulp-sass');
  var uglify   = require('gulp-uglify');

  gulp.task('default', function () {
    gulp.start('styles', 'scripts');
  });

  gulp.task('watch', ['styles', 'scripts'], function () {
    gulp.watch('./assets/stylesheets/**/*.scss', ['styles']);
    gulp.watch('./assets/javascripts/**/*.js', ['scripts']);
  });

  gulp.task('styles', function () {
    return gulp.src('./assets/stylesheets/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('all.css'))
      .pipe(cleanCSS())
      .pipe(gulp.dest('./public/stylesheets'));
  });

  gulp.task('scripts', function () {
    return gulp.src('./assets/javascripts/**/*.js')
      .pipe(concat('all.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./public/javascripts'));
  });
}());
