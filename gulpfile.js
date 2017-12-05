'use strict'
const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const nodemon = require('gulp-nodemon')
const babel = require('gulp-babel')


gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init({
    proxy: "http://localhost:3000",
    port: 8000,
    notify: true,
  })
})


gulp.task('nodemon', ['compile'], function (cb) {
  const stream = nodemon({
    watch: './src',
    script: './dist',
    ext: 'sass pug',
    tasks: ['compile'],
    env: {
      'NODE_ENV': 'development',
      'DEBUG': 'ex-es6-template:*',
    },
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  return stream
  .once('start', function () {
    cb()
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false })
    }, 1000)
  })
  .on('crash', function () {
    console.error('\nApplication has crashed!\n')
    console.error('Restarting in 2 seconds...\n')
    setTimeout(function () {
      stream.emit('restart')
    }, 2000)
  })
})


gulp.task('compile', ['copy'], function () {
  return gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./dist'))
})


gulp.task('copy', () => {
  return gulp
    .src('./src/**/*')
    .pipe(gulp.dest('./dist'))
})


gulp.task('default', ['browser-sync'])
