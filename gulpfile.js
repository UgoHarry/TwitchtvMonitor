// REQUIRE PLUGINS
var gulp = require("gulp");
var gulpLoadPlugins =  require("gulp-load-plugins");
var $ = gulpLoadPlugins();
var browserSync = require("browser-sync").create();
var del = require ("del");
var wiredep = require("wiredep").stream;


//////////////////TASKS/////////////////////////
