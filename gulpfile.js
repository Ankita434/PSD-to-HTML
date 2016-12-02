/**
 * Created by Artemka on 27.11.2016.
 */
'use strict';
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    rimraf = require('rimraf'),
    watch = require('gulp-watch'),
    imagemin = require('gulp-imagemin');


gulp.task('html', function () {
    gulp.src('src/**/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('build/'));
});
gulp.task('img', function () {
    gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img/'));
});

gulp.task('concatjs', function () {
    gulp.src('src/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('build/js'))
});
gulp.task('sass', function () {
    gulp.src('src/sass/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css/'))
});
gulp.task('concatcss', function () {
    gulp.src('src/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/style'))
});
gulp.task('fonts', function () {
    gulp.src('src/fonts/**/*.ttf')
        .pipe(gulp.dest('build/fonts/'))
});
gulp.task('clean', function (cb) {
    rimraf('build', cb);
});
gulp.task('watch', function() {
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/js/**/*.js', ['concatjs']);
    gulp.watch('src/sass/*.sass', ['sass']);
    gulp.watch('src/css/**/*.css', ['concatcss']);
    gulp.watch('src/img/**/*', ['img']);
    gulp.watch('src/fonts/**/*.ttf', ['fonts']);


});


gulp.task('default', ['clean', 'html', 'sass', 'fonts', 'concatcss', 'concatjs', 'img', 'fonts' ]);