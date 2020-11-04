let gulp = require('gulp'),
    minifyHTML = require('gulp-htmlmin'),
    sass = require('gulp-sass'),
    imageMin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-csso'),
    terserJS = require('gulp-terser'),
    rename = require('gulp-rename'),
    delFiles = require('del'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync');
    concat = require('gulp-concat');

/*--------- HTML --------------------------*/

// Минификация html и перемещение в dist
gulp.task('html', () => {
    return gulp.src('src/html/index.html')
        .pipe(minifyHTML({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

// Следим за изменениями в html
gulp.task('html:watch', () => {
    return gulp.watch('src/html/index.html', gulp.series('html', (done) => {
        browserSync.reload();
        done();
    }));
});

/*--------- SASS --------------------------*/

// Компиляция sass в css.min и перемщение в dist/css
gulp.task('sass', function () {
    return gulp.src(['src/sass/**/*.sass'])
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(rename({suffixes: '.min'}))
        .pipe(gulp.dest("dist/css"));
});

// Следим за изменеиями в sass
gulp.task('sass:watch', () => {
    return gulp.watch('src/sass/**/*.sass', gulp.series('sass', (done) => {
        browserSync.reload();
        done();
    }));
});

/*--------- CSS --------------------------*/

// Минификация css в css.min и перемщение в dist/css
gulp.task('css', function () {
    return gulp.src([
        'src/css/**/*.css',
        "node_modules/swiper/swiper-bundle.min.css"])
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(gulp.dest("dist/css"));
});

// Следим за изменеиями в css
gulp.task('css:watch', () => {
    return gulp.watch('src/css/**/*.css', gulp.series('css', (done) => {
        browserSync.reload();
        done();
    }));
});

/*--------- FONTS --------------------------*/

// Компиляция и перемещение fonts в dist
gulp.task('fonts', () => {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

// Следим за изменеиями в fonts
gulp.task('fonts:watch', () => {
    return gulp.watch('src/fonts/**/*', gulp.series('fonts', (done) => {
        browserSync.reload();
        done();
    }));
});

/*--------- IMG --------------------------*/

// Сжатие изображений и перемещение img в dist
gulp.task('img', () => {
    return gulp.src('src/img/**/*')
        //.pipe(imageMin())
        .pipe(gulp.dest('dist/img'));
});

// Следим за изменеиями в img
gulp.task('img:watch', () => {
    return gulp.watch('src/img/**/*', gulp.series('img', (done) => {
        browserSync.reload();
        done();
    }));
});

/*--------- JS --------------------------*/

// Перемещение javascript файлов в /dist/js
gulp.task('js', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        "node_modules/swiper/swiper-bundle.min.js",
        "node_modules/onscreen/dist/on-screen.umd.min.js"])
        .pipe(gulp.dest("dist/js"));
});

// Минификация кастомных файлов .js и переименование их в .js.min
gulp.task('js:es6', function () {
    return gulp.src(['src/js/**/*.js'])
        .pipe(gulp.dest("dist/js"))
        .pipe(terserJS())
        //.pipe(rename({suffixes: '.min'}))
        .pipe(gulp.dest("dist/js"))
});

// Преобразование кастомных файлов .js из es6 в es5
gulp.task('babel', function () {
    return gulp.src(['src/js/**/*.js'])
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(rename({suffixes: '.es5'}))
        .pipe(gulp.dest("dist/js"));
});

// Следим за изменеиями в js
gulp.task('js:watch', () => {
    return gulp.watch('src/js/**/*.js', gulp.series('js:es6', (done) => {
        browserSync.reload();
        done();
    }));
});

// Следим за изменеиями в js
gulp.task('babel:watch', () => {
    return gulp.watch('src/js/**/*.js', gulp.series('babel', (done) => {
        browserSync.reload();
        done();
    }));
});

/*--------- WEBFONTS --------------------------*/

// Компиляция и перемещение fonts в dist
gulp.task('webfonts', () => {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
        .pipe(gulp.dest('dist/webfonts'));
});

/*--------- CLEAN --------------------------*/

// Очищение содержимого папки dist
gulp.task('clean', () => {
    return delFiles(['dist/**', '!dist']);
});

/*--------- SERVER --------------------------*/

// Поднимаем локальный сервер
gulp.task('server', () => {
    return browserSync({
        server: {
            browser: 'chrome',
            baseDir: 'dist'
        }
    })
});


/*--------- START --------------------------*/

gulp.task('default', gulp.series('clean', gulp.parallel(
    'html',
    'sass',
    'css',
    'img',
    'fonts',
    //'webfonts',
    'js',
    'js:es6',
    //'babel',
    'server',
    'sass:watch',
    'css:watch',
    'html:watch',
    'js:watch',
    //'babel:watch',
)));
