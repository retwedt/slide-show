// Slide-Show, an Image Carousel Clone


// Gulp and Plugins
// ****************

var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var uglify = require("gulp-uglify"); // js minifier
var rename = require("gulp-rename");
var merge = require("merge-stream");
var ghPages = require("gulp-gh-pages");


// Build Tasks
// ***********

// minify and copy JS for the project into dist/
gulp.task("js-min", function() {
	return gulp.src("src/js/*.js")
		.pipe(uglify())
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest("dist"))
});
gulp.task("js", function() {
	return gulp.src("src/js/*.js")
		.pipe(gulp.dest("dist"))
});


// Convert from sass to css, add vendor prefixes
gulp.task("sass", function () {
	// Configure a sass stream so that it logs errors properly
	var sassStream = sass({
		outputStyle: "expanded"
	});
	sassStream.on("error", sass.logError);

	return gulp.src("src/scss/*.scss")
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
	return img = gulp.src("src/img/*.*")
		.pipe(gulp.dest("dist/img"));
});


// build
gulp.task("build", [
	"js-min",
	"js",
	"sass",
	"img"
]);


// Default task, build the library
gulp.task("default", [
	"build"
]);



// Deploy Tasks
// ************

// create a live-demo folder for github pages
gulp.task("publish", function () {
  var html = gulp.src("./src/demo/**/*.*")
  	.pipe(gulp.dest("./_demo"));
  var dist = gulp.src("./dist/**/*.*")
    .pipe(gulp.dest("./_demo/dist"));
  return merge(html, dist);
});


// deploy to github pages
gulp.task("deploy", ["publish"], function () {
  return gulp.src("./_demo/**/*")
	.pipe(ghPages({
		remoteUrl: "https://github.com/retwedt/slide-show.git"
	}));
});

