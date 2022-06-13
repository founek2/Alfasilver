const gulp = require('gulp');
const embedSvg = require('gulp-embed-svg');

var gulpPub = require('gulp-pug-i18n');
var gulpSass = require('gulp-sass')(require('node-sass'));
var autoprefixer = require('gulp-autoprefixer');

function sassWatch() {
    gulp.watch('./src/sass/**/*.scss', sass);
}
function pugWatch() {
    gulp.watch(['./src/html/**/*.pug', 'src/locale/**/*.yml'], pug);
}
function imgWatch() {
    gulp.watch(['./src/images/**/*'], images);
}
function videoWatch() {
    gulp.watch(['./src/videos/**/*'], videos);
}

function jsWatch() {
    gulp.watch(['./src/js/**/*'], js);
}

function sass() {
    return gulp
        .src('./src/sass/**/*.scss')
        .pipe(
            gulpSass({
                outputStyle: 'compressed',
            })
        )
        .on('error', gulpSass.logError)
        .pipe(
            autoprefixer({
                cascade: false,
            })
        )
        .on('error', gulpSass.logError)
        .pipe(gulp.dest('output/css'));
}

function images() {
    return gulp.src(['./src/images/**/*']).pipe(gulp.dest('output/images'));
}

function videos() {
    return gulp.src(['./src/videos/**/*']).pipe(gulp.dest('output/videos'));
}

function fonts() {
    return gulp.src(['./src/fonts/**/*']).pipe(gulp.dest('output/css'));
}

function js() {
    return gulp.src(['./src/js/**/*']).pipe(gulp.dest('output/js'));
}

function pug() {
    return gulp
        .src('./src/html/[^_]*.pug')
        .pipe(
            gulpPub({
                i18n: {
                    locales: 'src/locale/*', // locales: en.yml, de.json,
                    filename: '{{basename}}.{{lang}}.html',
                },
                pretty: true, // Pug option
            })
        )
        .pipe(embedSvg({ root: './src' }))
        .pipe(gulp.dest('output'));
}

exports.watch = gulp.parallel(sassWatch, pugWatch, imgWatch, videoWatch, jsWatch);
exports.build = gulp.parallel(sass, pug, images, videos, fonts, js);
exports.default = exports.build;
