var
    file = require('./lib/file'),
    gulp = require('gulp'),
    exec = require('child_process').exec,
    fs = require('fs'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');
//    rename = require('gulp-rename');

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
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js/bulid'));
});

// gulp.task('css',function(){
//     gulp.src('css/*.css')
//         .pipe(cssUglify())
//         .pipe(gulp.dest('css/bulid'));
// });

gulp.task('default', ['img', 'js'], function () {});
