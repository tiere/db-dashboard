(function () {
  'use strict';

  var autoprefixer = require('gulp-autoprefixer');
  var cleanCSS     = require('gulp-clean-css');
  var concat       = require('gulp-concat');
  var gulp         = require('gulp');
  var sass         = require('gulp-sass');
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
    return gulp.src([
      './assets/javascripts/jquery/jquery-2.2.1.js',
      './assets/javascripts/bootstrap/bootstrap.js'
    ])
      .pipe(concat('all.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./public/javascripts'));
  });

  gulp.task('fonts', function () {
    return gulp.src('./assets/fonts/bootstrap/*')
      .pipe(gulp.dest('./public/fonts/bootstrap'));
  });
}());
