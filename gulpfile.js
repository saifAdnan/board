/**
 * require dependencies
 */
var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var glue = require("gulp-sprite-glue");
var less = require('gulp-less');
var path = require('path');

/**
 * Dependencies config
 */
var minifyCSSConfig = {
    path: 'dev/css/*.css',
    keepBreaks: false,
    dest: 'public/css/'
};
var minifyHTMLConfig = {
    opts: {
        comments: false,
        spare: false
    },
    files: {
        index: './dev/html/index.html',
        partials: './dev/html/partials/*.html'
    }
};
var uglifyConfig = {
    ext: 'dev js css',
    ignores: ['public/dist/*.*'],
    files: {
        ng: {
            path: [
                'dev/js/*.js',
                'dev/js/controllers/*.js',
                'dev/js/services/*.js',
                'dev/js/directives/*.js'
            ],
            dist: './public/dist/app/'
        },
        'angular.min': {
            path: 'dev/lib/angular.js',
            dist: './public/dist/lib/'
        },
        'angular-route.min': {
            path: 'dev/lib/angular-route.js',
            dist: './public/dist/lib/'
        }
    }
};

// Minify CSS
gulp.task('minifyCSS', function() {
    gulp.src(minifyCSSConfig.path)
        .pipe(minifyCSS(minifyCSSConfig.keepBreaks))
        .pipe(gulp.dest(minifyCSSConfig.dest))
});

// Minify HTML
gulp.task('minifyHTML', function() {

    gulp.src(minifyHTMLConfig.files.index)
        .pipe(minifyHTML(minifyHTMLConfig.opts))
        .pipe(gulp.dest('./'));

    gulp.src(minifyHTMLConfig.files.partials)
        .pipe(minifyHTML(minifyHTMLConfig.opts))
        .pipe(gulp.dest('./public/partials/'));
});

// Uglify JS
gulp.task('uglifyJS', function() {
    for (key in uglifyConfig.files) {
        gulp.src(uglifyConfig.files[key].path)
            .pipe(uglify(key + '.js', {
                outSourceMap: false
            }))
            .pipe(gulp.dest(uglifyConfig.files[key].dist));
    }
});

// Sprite images
gulp.task('glueSprite', function () {
    gulp.src("./dev/images/")
        .pipe(glue("./public/images",{
            less: true,
            lessTemplate: __dirname + '/dev/images/project.jinja',
            css: false
        }));
});

// less to css
gulp.task('less', function () {
    gulp.src('./dev/less/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('default', function () {
    gulp.start('minifyHTML', 'glueSprite', 'less', 'minifyCSS', 'uglifyJS');
});