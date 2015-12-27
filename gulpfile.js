var
    file = require('./lib/file'),
    gulp = require('gulp'),
    exec = require('child_process').exec,
    fs = require('fs'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify-css'),
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
    gulp.src('js/*.js')
        .pipe(concat('app.js'))
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('js/build'));
});

gulp.task('css',function(){
    gulp.src('css/*.css')
        .pipe(concat('style.css'))
        .pipe(rename({suffix:'.min'}))
        .pipe(minify())
        .pipe(gulp.dest('css/build'));
});

gulp.task('watch',function(){
    gulp.watch('js/*.js',['js']);
    gulp.watch('css/*.css',['css']);
});

gulp.task('default', ['img', 'js','css']);
