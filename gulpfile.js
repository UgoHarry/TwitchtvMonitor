// REQUIRE PLUGINS
var gulp = require("gulp");
var gulpLoadPlugins =  require("gulp-load-plugins");
var $ = gulpLoadPlugins();
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
var del = require ("del");
var wiredep = require("wiredep").stream;
var runSequence = require("run-sequence");


//////////////////TASKS/////////////////////////

//COMPILING SCSS TO CSS
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
  .pipe($.plumber())
  .pipe($.sass().on('error', $.sass.logError))
  .pipe(gulp.dest('app/css'))
  .pipe(reload({
    stream:true
  }));
});

//LIVERELOAD
gulp.task('browserSync', function () {
  browserSync.init({
    server:{
      baseDir: "app"
    }
  });
});


//WATCHING FOR FILE CHANGES
gulp.task('watch', ['browserSync', 'sass'],function(){
  gulp.watch("app/scss/**/*.scss",['sass']);
  gulp.watch("app/*.html", reload);
  gulp.watch("app/js/**/*.js", reload);
});

//OPTIMISING FILES FOR PRODUCTION
gulp.task('useref', function() {
  return gulp.src('app/*.html')
  .pipe($.useref())
  .pipe($.if('*.js', $.uglify()))
  .pipe($.if('*.css', $.uglifycss({
    "maxLineLen" : 80,
    "uglyComments":true
  })))
  .pipe(gulp.dest('dist'));
});


//lOAD VENDOR FILES ON PRODUCTION
gulp.task('bower', function() {
  gulp.src ('dist/index.html')
    .pipe(wiredep({
        ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('dist'));
});



//CLEANING UP FILES FOR PRODUCTION
gulp.task('clean:dist', function() {
    del.sync(['!dist', 'dist/**']);
});


//BUILD OPTIMISED FILES
gulp.task ('build', function() {
    runSequence('clean:dist', 'sass', 'useref', 'bower', function() {
        console.log('Building files...');
    });
});
