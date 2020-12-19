// const autoprefixer = require('gulp-autoprefixer'),
//   babel = require('gulp-babel'),
//   browserSync = require('browser-sync'),
//   cleanCSS = require('gulp-clean-css'),
//   del = require('del'),
//   concat = require('gulp-concat'),
//   gulp = require('gulp'),
//   plumber = require('gulp-plumber'),
//   rename = require('gulp-rename'),
//   scss = require('gulp-sass'),
//   sourcemaps = require('gulp-sourcemaps'),
//   uglify = require('gulp-uglify');

// gulp.task('del', async function() {
//   del.sync('docs');
// });

// gulp.task('scss', function() {
//   return gulp.src('app/scss/**/style.scss')
//     .pipe(plumber())
//     .pipe(rename({
//       suffix: '.min'
//     }))
//     .pipe(scss({
//       outputStyle: 'compressed'
//     }).on('error', scss.logError))
//     .pipe(autoprefixer({
//       overRideBrowsers: ['last 10 versions'],
//     }))
//     .pipe(gulp.dest('app/css'))
//     .pipe(browserSync.reload({
//       stream: true
//     }))
// });

// gulp.task('css-libs', function() {
//   return gulp.src([
//       'node_modules/normalize.css/normalize.css',
//       'node_modules/animate.css/animate.min.css',
//       'node_modules/magnific-popup/dist/magnific-popup.css',
//       'node_modules/slick-carousel/slick/slick.css',
//       'app/libs/font-awesome/all.min.css'
//     ])
//     .pipe(concat('_libs.scss'))
//     .pipe(gulp.dest('app/scss'))
//     .pipe(browserSync.reload({
//       stream: true
//     }))
// });

// gulp.task('html', function() {
//   return gulp.src('app/**/*.html')
//     .pipe(browserSync.reload({
//       stream: true
//     }))
// });

// gulp.task('js', function() {
//   return gulp.src([
//       'node_modules/slick-carousel/slick/slick.min.js',
//       'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
//       'app/js/index.js'
//     ])
//     .pipe(plumber())
//     .pipe(babel({
//       presets: ['@babel/env']
//     }))
//     .pipe(concat('index.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('app/js'))
//     .pipe(browserSync.reload({
//       stream: true
//     }))
// });

// gulp.task('browser-sync', function() {
//   browserSync.init({
//     server: {
//       baseDir: "app/"
//     }
//   });
// });

// gulp.task('export', async function() {
//   let buildHtml = gulp.src('app/**/*.html')
//     .pipe(gulp.dest('docs'))

//   let buildCSS = gulp.src('app/css/**/*.min.css')
//     .pipe(cleanCSS())
//     .pipe(gulp.dest('docs/css'))

//   let buildJS = gulp.src('app/js/**/*.min.js')
//     .pipe(gulp.dest('docs/js'))

//   let buildFonts = gulp.src('app/fonts/**/*.*')
//     .pipe(gulp.dest('docs/fonts'))

//   let buildImg = gulp.src('app/img/**/*.*')
//     .pipe(gulp.dest('docs/img'))

//   let buildVideo = gulp.src('app/video/**/*.*')
//     .pipe(gulp.dest('docs/video'))

//   let buildLibs = gulp.src('app/libs/**/*.*')
//     .pipe(gulp.dest('docs/libs'))
// });

// gulp.task('build', gulp.series('del', 'export'));

// gulp.task('watch', function() {
//   gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
//   gulp.watch('app/**/*.html', gulp.parallel('html'));
//   gulp.watch('app/js/index.js', gulp.parallel('js'))
// });

// gulp.task('default', gulp.parallel('css-libs', 'scss', 'js', 'html', 'browser-sync', 'watch'));

const { src, dest, watch, parallel, series } = require("gulp");
const scss = require("gulp-sass");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify-es").default;
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const del = require("del");

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
}

function cleanDist() {
  return del("dist");
}

function cleanDistWithoutImg() {
  return del(["dist/**", "!dist/img/**"]);
}

function images() {
  return src("app/img/**/*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(webp())
    .pipe(dest("dist/img/"));
}

function scripts() {
  return src([
    "node_modules/slick-carousel/slick/slick.min.js",
    "node_modules/magnific-popup/dist/jquery.magnific-popup.min.js",
    "app/js/index.js",
  ])
    .pipe(concat("index.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js/"))
    .pipe(browserSync.stream());
}

function styles() {
  return src("app/scss/style.scss")
    .pipe(scss({ outputStyle: "compressed" }).on("error", scss.logError))
    .pipe(concat("style.min.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 versions"],
        grid: true,
      })
    )
    .pipe(dest("app/css/"))
    .pipe(browserSync.stream());
}

function build() {
  return src(
    [
      "app/css/style.min.css",
      "app/fonts/**/*",
      "app/js/index.min.js",
      "app/*.html",
    ],
    { base: "app" }
  ).pipe(dest("dist"));
}

function watching() {
  watch("app/scss/**/*.scss", styles);
  watch(["app/js/**/*.js", "!app/js/index.min.js"], scripts);
  watch("app/*.html").on("change", browserSync.reload);
}

exports.browsersync = browsersync;
exports.styles = styles;
exports.watching = watching;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.cleanDistWithoutImg = cleanDistWithoutImg;

exports.build = series(cleanDistWithoutImg, build);
exports.buildWithImages = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, browsersync, watching);
