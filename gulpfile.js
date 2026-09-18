const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const { Transform } = require('node:stream');

function styles() {
  return gulp.src('sass/main.scss')
    .pipe(sass({
      style: 'compressed',
      charset: false,
      // Upstream Canvas/Bootstrap still use Sass's legacy import API.
      silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function'],
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(new Transform({
      objectMode: true,
      transform(file, encoding, done) {
        file.basename = 'bundle.css';
        done(null, file);
      },
    }))
    .pipe(gulp.dest('css-output'));
}

exports.build = styles;
exports.watch = gulp.series(styles, function watchStyles() {
  return gulp.watch('sass/**/*.scss', styles);
});
