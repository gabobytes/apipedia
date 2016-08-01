/*dependencies*/
var gulp = 	require('gulp'),
	uglify = require('gulp-uglify'),
	uglifycss = require('gulp-uglifycss'),
	livereload = require('gulp-livereload'),
	concat = require('gulp-concat');

//scripts tasks
gulp.task('scripts',function(){
	gulp.src('source/js/*.js')
		.pipe(uglify())
		.pipe(concat('app.js'))
		.pipe(gulp.dest('build/js/'))
		.pipe(livereload());

});

//css tasks
gulp.task('css',function(){
	gulp.src('source/css/*.css')
	.pipe(uglifycss())
	.pipe(concat('styles.css'))
	.pipe(gulp.dest('build/css/'))
	.pipe(livereload());
});

//html task
gulp.task('html',function(){
	gulp.src('*.html')
	.pipe(livereload());
})

//watch task
gulp.task('watch',function(){
	livereload.listen();
	gulp.watch('source/js/*.js',['scripts']);
	gulp.watch('source/css/*.css',['css']);
	gulp.watch('*.html',['html']);
})

//default task
gulp.task('default',['scripts','css','watch'])