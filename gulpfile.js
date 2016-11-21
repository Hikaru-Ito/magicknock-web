'use strict'

/**
 *  Import Dependencies
 */
const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync')
const reload = browserSync.reload
const exec = require('child_process').exec
const image = require('gulp-image')

/**
 * Paths
 */
const paths = {
  scss: './style/**.scss',
  image: './images/*',
  cssDir: './build/css',
  src: ['./src/**/*', './layouts/**/*']
}

/**
 * Tasks
 */
gulp.task('browsersync', () => {
  browserSync.init({
    files: ['./build/**/**.**'],
    server: {
      baseDir: './build'
    },
    port: 9000
  })
})

gulp.task('image', function () {
  gulp.src(paths.image)
    .pipe(image())
    .pipe(gulp.dest('./build/images'))
})

gulp.task('sass', ()=> {
  gulp.src(paths.scss)
  .pipe(sass())
  .pipe(gulp.dest(paths.cssDir))
  .pipe(reload({ stream: true }))
})

gulp.task('build', ['sass', 'image'], (cb) => {
  exec('node index.js', (err) => {
    cb(err)
  })
})
gulp.task('deploy', (cb) => {
  exec('git subtree push --prefix build origin gh-pages', (err) => {
    cb(err)
  })
})
gulp.task('watch', ['browsersync'], () => {
  gulp.watch(paths.src, ['build'])
  gulp.watch(paths.scss, ['sass'])
})
