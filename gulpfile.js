var gulp = require('gulp');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var webserver = require('gulp-webserver')

gulp.task('server', function () {
	return gulp.src('')
		.pipe(webserver());
});

gulp.task('combine-daum', function() {
    return gulp.src([
        'src/js/map_daum.js',
        'src/js/map_polyline.js',
        ])
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(concat('daum_polyline.min.js'))
        .pipe(gulp.dest('dist/js'));
    });

gulp.task('combine-naver', function() {
    return gulp.src([
        'src/js/map_naver.js',
        'src/js/map_polyline.js',
        ])
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(concat('naver_polyline.min.js'))
        .pipe(gulp.dest('dist/js'));
    });

gulp.task('combine-google', function() {
    return gulp.src([
        'src/js/map_google.js',
        'src/js/map_polyline.js',
        ])
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(concat('google_polyline.min.js'))
        .pipe(gulp.dest('dist/js'));
    });

gulp.task('default', ['combine-daum', 'combine-naver', 'combine-google']);
