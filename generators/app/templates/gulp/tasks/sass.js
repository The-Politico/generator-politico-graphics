const gulp = require('gulp');
const gulpif = require('gulp-if');
const nano = require('gulp-cssnano');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const production = task => gulpif(process.env.NODE_ENV === 'production', task);

module.exports = () =>
  gulp.src(['./src/scss/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(production(nano()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'));
