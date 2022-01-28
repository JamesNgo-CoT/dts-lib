const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const gulpBabel = require('gulp-babel');
const gulpBeautify = require('gulp-beautify');
const gulpPreProcess = require('gulp-preprocess');
const gulpRename = require('gulp-rename');
const gulpSourceMaps = require('gulp-sourcemaps');
const gulpTerser = require('gulp-terser');
const gulpUglify = require('gulp-uglify');

const beautifyOptions = JSON.parse(fs.readFileSync('./.jsbeautifyrc', 'utf8'));

const destRoot = './dist/';

function cleanup() {
	return del(destRoot);
}

const jsGlobs = ['./src/**/*.js'];

function build_browser_es5() {
	const dest = `${destRoot}es5/`;
	return gulp.src(jsGlobs, { since: gulp.lastRun(build_browser_es5) })
		.pipe(gulpPreProcess({ context: { TARGET: 'BROWSER-ES5' } }))
		.pipe(gulpBabel())
		.pipe(gulpBeautify(beautifyOptions))
		.pipe(gulp.dest(dest))
		.pipe(gulpRename((path) => path.basename += '.min'))
		.pipe(gulpSourceMaps.init())
		.pipe(gulpUglify())
		.pipe(gulpSourceMaps.write('.'))
		.pipe(gulp.dest(dest));
}

function build_browser_es6() {
	const dest = `${destRoot}es6/`;
	return gulp.src(jsGlobs, { since: gulp.lastRun(build_browser_es6) })
		.pipe(gulpPreProcess({ context: { TARGET: 'BROWSER-ES6' } }))
		.pipe(gulpBeautify(beautifyOptions))
		.pipe(gulp.dest(dest))
		.pipe(gulpRename((path) => path.basename += '.min'))
		.pipe(gulpSourceMaps.init())
		.pipe(gulpTerser())
		.pipe(gulpSourceMaps.write('.'))
		.pipe(gulp.dest(dest));
}

function build_browser_es6Module() {
	const dest = `${destRoot}es6-module/`;
	return gulp.src(jsGlobs, { since: gulp.lastRun(build_browser_es6Module) })
		.pipe(gulpPreProcess({ context: { TARGET: 'BROWSER-ES6-MODULE' } }))
		.pipe(gulpBeautify(beautifyOptions))
		.pipe(gulp.dest(dest))
		.pipe(gulpRename((path) => path.basename += '.min'))
		.pipe(gulpSourceMaps.init())
		.pipe(gulpTerser())
		.pipe(gulpSourceMaps.write('.'))
		.pipe(gulp.dest(dest));
}

const build = gulp.parallel(build_browser_es5, build_browser_es6, build_browser_es6Module);

function watch() {
	gulp.watch(jsGlobs, build);
}

module.exports = {
	build: gulp.series(cleanup, build),
	watch: gulp.series(cleanup, build, watch)
};
