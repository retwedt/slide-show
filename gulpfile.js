// Slide-Show, an Image Carousel Clone


// Setup
// Gulp & gulp plugins
var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var uglify = require("gulp-uglify"); // minifier
var rename = require("gulp-rename");
var ghPages = require("gulp-gh-pages"); // easy upload of live demo to gh-pages


// Build Tasks
// minify and copy JS for the project into dist/
gulp.task("js-min", function() {
	return gulp.src("source/js/*.js")
		.pipe(uglify())
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest("dist"))
});
gulp.task("js", function() {
	return gulp.src("source/js/*.js")
		.pipe(gulp.dest("dist"))
});


// Convert from sass to css adding vendor prefixes along the way and generating
// a source map to allow for easier debugging in chrome.
gulp.task("sass", function () {
	// Configure a sass stream so that it logs errors properly
	var sassStream = sass({
		outputStyle: "expanded"
	});
	sassStream.on("error", sass.logError);

	return gulp.src("source/scss/*.scss")
	.pipe(sassStream)
	.pipe(autoprefixer({
		browsers: [
			// https://github.com/twbs/bootstrap-sass#sass-autoprefixer
			"Android 2.3",
			"Android >= 4",
			"Chrome >= 20",
			"Firefox >= 24",
			"Explorer >= 8",
			"iOS >= 6",
			"Opera >= 12",
			"Safari >= 6"
		],
		cascade: true
	}))
	.pipe(gulp.dest("dist"))
});


// Copy slide show image assets to the dist folder
gulp.task("img", function () {
	return img = gulp.src("source/img/*.*")
		.pipe(gulp.dest("dist/img"));
});


gulp.task("build", [
	"js-min",
	"js",
	"sass",
	"img"
]);


// Building and Deploy Tasks
// Default task is run when "gulp" is run from terminal
gulp.task("default", [
	"build"
]);


// ** DOESN'T WORK YET!!!
// Build & deploy the public/ folder to gh-pages
gulp.task("deploy-gh", ["build"], function () {
  return gulp.src("./public/**/*")
	.pipe(ghPages({
		remoteUrl: "https://github.com/retwedt/slide-show.git"
	}));
});
// build and deploy site!
gulp.task("deploy", [
	"build",
	"deploy-gh"
]);
