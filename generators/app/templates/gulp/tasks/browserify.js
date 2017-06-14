const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const babili = require('gulp-babili');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const watchify = require('watchify');
const gutil = require('gulp-util');
const babelify = require('babelify');
const es = require('event-stream');

module.exports = () => {
  const files = [
    'chart.js',
    'global-chart.js',
  ];

  const tasks = files.map((entry) => {
    const props = {
      entries: `./src/js/${entry}`,
      extensions: ['.js'],
      cache: {},
      packageCache: {},
      debug: true,
    };

    const bundler = watchify(browserify(props).transform(babelify, {
      presets: ['es2015'],
    }));

    function bundle() {
      return bundler.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source(entry))
      .pipe(buffer())
      .pipe(!!gutil.env.production ? sourcemaps.init({ loadMaps: true }) : gutil.noop())
      .pipe(!!gutil.env.production ? babili({
            removeConsole: true,
            mangle: {
              keepClassNames: true,
            },
          }).on('error', gutil.log) : gutil.noop())
      .pipe(!!gutil.env.production ? sourcemaps.write('./') : gutil.noop())
      .pipe(gulp.dest('./dist/js/'));
    }

    bundler.on('log', gutil.log);
    bundler.on('update', bundle);

    return bundle();
  });
  return es.merge.apply(null, tasks);
};
