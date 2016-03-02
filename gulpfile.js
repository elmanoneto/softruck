var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass');

gulp.task('server', function() {
    browserSync.init({
        server: {
          injectChanges: true,
          baseDir: "./"
        }
    });

    gulp.watch("./**/*").on('change', browserSync.reload);
    gulp.watch("src/assets/sass/*.scss", ['compile-sass']).on('change', browserSync.reload);
});

gulp.task('compile-sass', function() {
  gulp.src('src/assets/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/assets/css/'))
    .pipe(browserSync.stream({match: '/src/assets/css/*.css'}));
});

gulp.task('default', ['server', 'compile-sass']);
