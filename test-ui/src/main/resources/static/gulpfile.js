var js = [

'./app/factories/*'

];

var css = [

'./css/*'

];

var gulp = require('gulp');

var uglify = require("gulp-uglify");

var concat = require("gulp-concat");

var cssmin = require("gulp-cssmin");

gulp.task('minify-js', function() {
	gulp.src(js).pipe(concat('usuario.factory.min.js')).pipe(uglify()).pipe(
			gulp.dest('./tasks/'));

});

gulp.task('minify-css', function() {
	gulp.src(css).pipe(concat('app.min.css')).pipe(cssmin()).pipe(
			gulp.dest('./css/'));
});

gulp.task('default', [ 'minify-js', 'minify-css' ]);

