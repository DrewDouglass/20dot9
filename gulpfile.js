var gulp = require('gulp');
var postcss = require('gulp-postcss');
var watch = require('gulp-watch');

/* https://github.com/postcss/autoprefixer */
var autoprefixer = require('autoprefixer');
/* https://github.com/jonathantneal/precss */
var precss = require('precss');
/* https://github.com/postcss/postcss-nested */
var postcssnested = require('postcss-nested');
/* http://simplaio.github.io/rucksack/ */
var rucksack = require('rucksack-css');
/* https://github.com/jedmao/postcss-center */
var postcsscenter = require('postcss-center');
/* https://github.com/cssstats/postcss-cssstats */
var cssstats = require('postcss-cssstats');
var postcss = require('gulp-postcss');
/* https://github.com/azat-io/postcss-responsive-images */
var responsiveimages = require('postcss-responsive-images');
/* https://github.com/jonathantneal/oldie */
var oldie = require('oldie');
/* https://github.com/jonathantneal/postcss-write-svg */
var postcsswritesvg = require('postcss-write-svg');
/* https://github.com/jonathantneal/postcss-unroot */
var postcssunroot = require('postcss-unroot');
/* https://github.com/postcss/postcss-calc */
var calc = require("postcss-calc")
var postcsscircle = require('postcss-circle');
var postcsstriangle = require('postcss-triangle');
/* https://www.npmjs.com/package/postcss-image-sizes */
var imageSizes = require('postcss-image-sizes');
/* https://github.com/iamvdo/postcss-opacity */
var cssOpacity = require('postcss-opacity');
/* https://github.com/archana-s/postcss-flexbox */
var postcssflexbox = require('postcss-flexbox');
/* https://github.com/zhouwenbin/postcss-animation */
var postcssanimation = require('postcss-animation');
/* https://github.com/arccoza/postcss-if-media */
var postcssifmedia = require('postcss-if-media');
/* https://github.com/postcss/postcss-easings */
var postcsseasings = require('postcss-easings');
/* https://www.browsersync.io/docs/gulp */
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        
    });
});

gulp.task('default', ['browser-sync'], function(){
    var processors = [ 
        postcssifmedia(),
        postcssnested(),
        precss(),  
        rucksack({ fallbacks: true }),
        postcsscenter(),
        postcsseasings(),
        calc(),
        postcsscircle(),
        postcsstriangle(),
        imageSizes({assetsPath: '/'}),
        cssOpacity(),
        postcssflexbox(),
        postcssanimation(),
        autoprefixer( { browsers: ['> 0%', 'last 25 version'] } ),
        responsiveimages(),
        postcssunroot(),
        ];
    return gulp.src('./src/*.css')
    .pipe(watch('./src/*.css'))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

gulp.task('cssstats', function() {
    return gulp
        .src('./dist/style.css')
        .pipe(
            postcss([
                cssstats(
                    function(stats) {
                        console.log(stats);
                    }
                )
            ])
        );
});

//Run only after the main style has been generated and only IF you're having issues
// in IE8 or lower.
gulp.task('ie8', function(){
    return gulp.src('./dist/*.css').pipe(
        postcss([
            require('oldie')({ /* options */ })
        ])
    ).pipe(
        gulp.dest('./dist/ie/')
    );
});
