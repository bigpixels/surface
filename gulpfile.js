'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const notify = require("gulp-notify");
const watch = require('gulp-watch');

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
    // browserSync.watch("./build", browserSync.reload)
    gulp.watch("./build/*.html").on('change', browserSync.reload);
    gulp.watch("./build/js/*.js").on('change', browserSync.reload);
});

gulp.task('sass-compile', function(){
    return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/css/'))
    .on("error", notify.onError({
        message: "Error: <%= error.message %>",
        title: "stile"
    }))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('watch', function(){
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass-compile'));
})

gulp.task('default', gulp.series(
    gulp.parallel('watch', 'sass-compile', 'serve',)
))