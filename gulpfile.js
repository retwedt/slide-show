// Slide-Show, an Image Carousel Clone


// Gulp and Plugins
// ****************

var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");


// Build Tasks
// ***********

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


// Default task, build the library
gulp.task("default", [
	"sass"
]);

