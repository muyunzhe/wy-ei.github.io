var
    file = require('./lib/file'),
    gulp = require('gulp'),
    exec = require('child_process').exec,
    fs = require('fs'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename');


gulp.task('compress', function () {
    var imgPath = './images';
    var largeImgFiles = file(imgPath).filter({
        minSize: 200 * 1024
    });
    largeImgFiles.forEach(function (element, index) {
        exec('convert -quality 50 ' + element.path + ' ' + element.path, function (err) {
            if (err) {
                console.log(err);
            }
            console.log(element.path + '  done!');
        });
    });
});

gulp.task('resize', function () {
    var imgPath = './images';
    var largeImgFiles = file(imgPath).filter({
        minSize: 200 * 1024
    });
    largeImgFiles.forEach(function (element, index) {
        exec('convert -resize 60%x60% ' + element.path + ' ' + element.path, function (err) {
            if (err) {
                console.log(err);
            }
            console.log(element.path + '  done!');
        });
    });
});

gulp.task('img', function () {
    var imgPath = './images';
    var largeImgFiles = file(imgPath).filter({
        minSize: 200 * 1024
    });
    largeImgFiles.forEach(function (element, index) {
        console.log((element.size / 1024).toFixed(2) + 'kb : ' + element.path);
    });
});

gulp.task('js', function () {
    gulp.src('src/js/*.js')
        .pipe(concat('app.js'))
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('src/build/js'));
});

gulp.task('css',function(){
    gulp.src('src/scss/style.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest('src/build/css'));
    gulp.src(['src/build/css/style.css','src/css/highlight.css'])
        .pipe(concat('style.css'))
        .pipe(minify())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('src/build/css'));
});

gulp.task('watch',function(){
    gulp.watch('src/js/*.js',['js']);
    gulp.watch('src/*.scss',['css']);
});

gulp.task('default', ['img', 'js','css']);
