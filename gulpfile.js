/**
 * Created by Artemka on 27.11.2016.
 */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    rimraf = require('rimraf'),
    watch = require('gulp-watch'),
    imagemin = require('gulp-imagemin');
    require('events').EventEmitter.prototype._maxListeners = 100;

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

gulp.task('js-sources', function () {
    gulp.src([
            'bower_components/jquery/dist/jquery.js',
            'bower_components/jquery-ui/jquery-ui.js',
            'bower_components/wow/dist/wow.js',
            'bower_components/swiper/dist/js/swiper.js',
            'bower_components/masonry/dist/masonry.pkgd.js'
        ])
        .pipe(concat('main-sources.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
});
gulp.task('concat-js',['js-sources'], function () {
    gulp.src([
            'src/js/main.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/js'))
});
gulp.task('sass', function () {
    gulp.src('src/sass/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css/'))
});
gulp.task('concatcss', function () {
    gulp.src([
            'bower_components/animate.css/animate.css',
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'bower_components/normalize-css/normalize.css',
            'bower_components/swiper/dist/css/swiper.css',
            'bower_components/components-font-awesome/css/font-awesome.css',
            'src/css/style.css'
        ])
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
    gulp.watch('src/js/**/*.js', ['concat-js']);
    gulp.watch('src/sass/*.sass', ['sass']);
    gulp.watch('src/css/**/*.css', ['concatcss']);
    gulp.watch('src/img/**/*', ['img']);
    gulp.watch('src/fonts/**/*.ttf', ['fonts']);


});


gulp.task('default', [ 'html', 'sass', 'fonts', 'concatcss', 'concat-js', 'img', 'fonts' ]);