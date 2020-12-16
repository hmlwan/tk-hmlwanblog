var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    minifyCss   = require('gulp-minify-css'),
    plumber     = require('gulp-plumber'),
    babel       = require('gulp-babel'),
    uglify      = require('gulp-uglify'),
    clearnHtml  = require("gulp-cleanhtml"),
    imagemin    = require('gulp-imagemin'),
    copy        = require('gulp-contrib-copy'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload;
    
// 定义源代码的目录和编译压缩后的目录
var src='Template/default_src',
    dist='Template/default';

// 编译全部scss 并压缩
gulp.task('css', function(cb){
    gulp.src(src+'/**/*.scss')
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(gulp.dest(dist))

    cb();
})

// 编译全部js 并压缩
gulp.task('js', function(cb) {
  gulp.src(src+'/**/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(dist));
    cb();
});

// 压缩全部html
gulp.task('html', function (cb) {
    gulp.src(src+'/**/*.+(html|tpl)')
    .pipe(clearnHtml())
    .pipe(gulp.dest(dist));
    cb();
});

// 压缩全部image
gulp.task('image', function (cb) {
    gulp.src([src+'/**/*.+(jpg|jpeg|png|gif|bmp)'])
    .pipe(imagemin())
    .pipe(gulp.dest(dist));
    cb();
});

// 其他不编译的文件直接copy
gulp.task('copy', function (cb) {
    gulp.src(src+'/**/*.!(jpg|jpeg|png|gif|bmp|scss|js|html|tpl)')
    .pipe(copy())
    .pipe(gulp.dest(dist));
    cb();
});

// 自动刷新
gulp.task('server', function(cb) {
    browserSync.init({
        proxy: "tbjyblog.com", // 指定代理url
        notify: false, // 刷新不弹出提示
    });
    // 监听scss文件编译
    gulp.watch(src+'/**/*.scss', gulp.parallel('css'));

    // 监听其他不编译的文件 有变化直接copy
    gulp.watch(src+'/**/*.!(jpg|jpeg|png|gif|bmp|scss|js|html)',gulp.parallel('copy'));

    // 监听html文件变化后刷新页面
    gulp.watch(src+"/**/*.js", gulp.parallel('js')).on("change", reload);

    // 监听html文件变化后刷新页面
    gulp.watch(src+"/**/*.+(html|tpl)", gulp.parallel('html')).on("change", reload);

    // 监听css文件变化后刷新页面
    gulp.watch(dist+"/**/*.css").on("change", reload);
    cb();
});

// 监听事件
gulp.task('default', gulp.parallel('css', 'js', 'image', 'html', 'copy', 'server'))
