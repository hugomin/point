const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');
const gulpSequence = require('gulp-sequence')
gulp.task('builddev', () => {
    return watch('src/nodeuii/**/*.js', { ignoreInitial: false }, () => {
        gulp.src('src/nodeuii/**/*.js')
            .pipe(babel({
                //关闭外侧的.babelrc
                babelrc: false,
                "plugins": ["transform-es2015-modules-commonjs"]
            }))
            .pipe(gulp.dest('dist'))
    })
}
);
gulp.task('buildprod', () => {
    gulp.src('src/nodeuii/**/*.js')
        .pipe(babel({
            //关闭外侧的.babelrc
            babelrc: false,
            ignore:["src/nodeuii/config/*.js"],
            "plugins": ["transform-es2015-modules-commonjs"]
        }))
        .pipe(gulp.dest('dist'))
}
);

gulp.task('configclean', function() {
    gulp.src('src/nodeuii/**/*.js')
      .pipe(rollup({
        // any option supported by Rollup can be set here.
        output:{
            format:"cjs"
        },
        input: "src/nodeuii/config/index.js",
        plugins: [
            replace({
              "process.env.NODE_ENV": JSON.stringify('production')
            })
          ]
      }))
      .pipe(gulp.dest('./dist'));
  });
//流清洗
let _task = ["builddev"];
if (process.env.NODE_ENV === "production") {
    _task = gulpSequence("buildprod","configclean");
}
gulp.task("default", _task);