const del = require('del');
const gulp = require('gulp');
const gulpBabel = require('gulp-babel');
const gulpPreProcess = require('gulp-preprocess');
const gulpRename = require('gulp-rename');
const gulpSourceMaps = require('gulp-sourcemaps');
const gulpTerser = require('gulp-terser');
const gulpUglify = require('gulp-uglify');

const rootDest = './dist/';

function cleanup() {
	return del(rootDest);
}

const serverSrc = ['./src/server/**/*.js'];
const rootServerDest = `${rootDest}server/`;

function build_server_es5() {
	const dest = `${rootServerDest}es5/`;
	return gulp.src(serverSrc, { since: gulp.lastRun(build_server_es5) })
		.pipe(gulpPreProcess({ context: { TARGET: 'SERVER_ES5' } }))
		.pipe(gulpBabel())
		.pipe(gulp.dest(dest))
		.pipe(gulpRename((path) => path.basename += '.min'))
		.pipe(gulpSourceMaps.init())
		.pipe(gulpUglify())
		.pipe(gulpSourceMaps.write('.'))
		.pipe(gulp.dest(dest));
}

const build_server = gulp.parallel(build_server_es5);

const browserSrc = ['./src/browser/**/*.js'];
const rootBrowserDest = `${rootDest}browser/`;

function build_browser_es5() {
	const dest = `${rootBrowserDest}es5/`;
	return gulp.src(browserSrc, { since: gulp.lastRun(build_browser_es5) })
		.pipe(gulpPreProcess({ context: { TARGET: 'BROWSER_ES5' } }))
		.pipe(gulpBabel())
		.pipe(gulp.dest(dest))
		.pipe(gulpRename((path) => path.basename += '.min'))
		.pipe(gulpSourceMaps.init())
		.pipe(gulpUglify())
		.pipe(gulpSourceMaps.write('.'))
		.pipe(gulp.dest(dest));
}

function build_browser_es6() {
	const dest = `${rootBrowserDest}es6/`;
	return gulp.src(browserSrc, { since: gulp.lastRun(build_browser_es6) })
		.pipe(gulpPreProcess({ context: { TARGET: 'BROWSER_ES6' } }))
		.pipe(gulp.dest(dest))
		.pipe(gulpRename((path) => path.basename += '.min'))
		.pipe(gulpSourceMaps.init())
		.pipe(gulpTerser())
		.pipe(gulpSourceMaps.write('.'))
		.pipe(gulp.dest(dest));
}

function build_browser_es6Module() {
	const dest = `${rootBrowserDest}es6-module/`;
	return gulp.src(browserSrc, { since: gulp.lastRun(build_browser_es6Module) })
		.pipe(gulpPreProcess({ context: { TARGET: 'BROWSER_ES6MODULE' } }))
		.pipe(gulp.dest(dest))
		.pipe(gulpRename((path) => path.basename += '.min'))
		.pipe(gulpSourceMaps.init())
		.pipe(gulpTerser())
		.pipe(gulpSourceMaps.write('.'))
		.pipe(gulp.dest(dest));
}

const build_browser = gulp.parallel(build_browser_es5, build_browser_es6, build_browser_es6Module);

const build = gulp.parallel(build_server, build_browser);

function watch() {
	gulp.watch(serverSrc, build_server);
	gulp.watch(browserSrc, build_browser);
}

module.exports = {
	build: gulp.series(cleanup, build),
	watch: gulp.series(cleanup, build, watch)
};
