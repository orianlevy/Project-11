"use strict";

var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  del = require('del'),
  useref = require('gulp-useref'),
  csso = require('gulp-csso'),
  gulpIf = require('gulp-if'),
  image = require('gulp-image');

var options = {
  src :'src',
  dist: 'dist'
}


gulp.task('clean', function(){
  return del(['dist','css/application.css*','js/app*.js*']);
});

gulp.task('html', function(){
  return gulp.src(options.src + '/index.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', csso()))
    .pipe(gulp.dest(options.dist));

});


gulp.task('compressImage', function () {
  gulp.src(options.src +'/img/**/*.{jpg,png}')
    .pipe(image().on('error', function(e){
        console.trace(e);
    }))
    .pipe(gulp.dest(options.dist + '/img'));
});


gulp.task("build", ['html','compressImage'], function(){
  return gulp.src([options.src + "/img/logo.png", options.src + "/img/social/*"], {base: './src'})
                    .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchFiles']);

gulp.task("default", ["clean"], function(){
  gulp.start('build');
});