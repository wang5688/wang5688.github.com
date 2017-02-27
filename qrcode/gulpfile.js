var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

gulp.task('concat',function() {
    gulp.src('./js/*.js')
        .pipe(concat('dec-qrcode.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['concat'], function(){
    gulp.src('./dec-qrcode.js')
        .pipe(uglify())
        .pipe(rename('dec-qrcode-min.js'))
        .pipe(gulp.dest('./'));
});
