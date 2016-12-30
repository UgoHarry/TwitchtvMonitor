// REQUIRE PLUGINS
var gulp = require("gulp");
var gulpLoadPlugins =  require("gulp-load-plugins");
var $ = gulpLoadPlugins();
var browserSync = require("browser-sync").create();
var del = require ("del");
var wiredep = require("wiredep").stream;
var reload = browserSync.reload;


//////////////////TASKS/////////////////////////

//COMPILING SCSS TO CSS
gulp.task('sass', function() {
  return gulp.src('app/scss/*.scss')
  .pipe($.sass().on('error', $.sass.logError))
  .pipe(gulp.dest('app/css'))
  .pipe(reload({
    stream:true
  }))
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

//CLEANING UP FILES FOR PRODUCTION
