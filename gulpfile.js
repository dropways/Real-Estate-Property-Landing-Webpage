var autoprefixer,
	browserSync,
	concat,
	config,
	gulp,
	imagemin,
	minify,
	path,
	plumber,
	rename,
	sass,
	streamqueue,
	uglify,
	changed,
	reload;

gulp = require("gulp");
sass = require("gulp-sass");
plumber = require("gulp-plumber");
rename = require("gulp-rename");
autoprefixer = require("gulp-autoprefixer");
concat = require("gulp-concat");
uglify = require("gulp-uglify");
imagemin = require("gulp-imagemin");
minify = require("gulp-clean-css");
streamqueue = require("streamqueue");
browserSync = require("browser-sync").create();
changed = require("gulp-changed");
reload = browserSync.reload;

config = {
	nodeDir: "./node_modules/",
};

var path = {
	styles: ["assets/scss/**/style.scss"],
	scripts: [
		config.nodeDir + "jquery/dist/jquery.js",
		config.nodeDir + "bootstrap/dist/js/bootstrap.min.js", // bootstrap js
		"assets/js/setting.js", // all setting js
	],
	fonts: ["assets/fonts/**/*.*"],
	images: "assets/images/**/*.*",
	php: ["*.html"],
};

gulp.task("styles", function () {
	var stream;
	stream = streamqueue({
		objectMode: true,
	});
	stream.queue(gulp.src(path.styles));
	return stream
		.done()
		.pipe(plumber())
		.pipe(sass())
		.pipe(
			autoprefixer({
				browsers: ["last 2 versions"],
				cascade: false,
			})
		)
		.pipe(concat("style.css"))
		.pipe(gulp.dest("vendors/css/"))
		.pipe(
			minify({
				keepSpecialComments: 0,
			})
		)
		.pipe(
			rename({
				suffix: ".min",
			})
		)
		.pipe(plumber.stop())
		.pipe(gulp.dest("vendors/css/"))
		.pipe(
			browserSync.reload({
				stream: true,
			})
		);
});

gulp.task("scripts", function () {
	var stream;
	stream = streamqueue({
		objectMode: true,
	});
	stream.queue(gulp.src(path.scripts));
	return stream
		.done()
		.pipe(plumber())
		.pipe(concat("script.js"))
		.pipe(gulp.dest("vendors/js/"))
		.pipe(
			rename({
				suffix: ".min",
			})
		)
		.pipe(uglify())
		.pipe(plumber.stop())
		.pipe(gulp.dest("vendors/js/"))
		.pipe(
			browserSync.reload({
				stream: true,
			})
		);
});

gulp.task("images", function () {
	var stream;
	stream = streamqueue({
		objectMode: true,
	});
	stream.queue(gulp.src(path.images));
	return stream
		.done()
		.pipe(changed("vendors/images/"))
		.pipe(
			imagemin({
				optimizationLevel: 3,
				progressive: true,
				interlaced: true,
			})
		)
		.pipe(gulp.dest("vendors/images/"));
});

gulp.task("php", function () {
	var stream;
	stream = streamqueue({
		objectMode: true,
	});
	stream.queue(gulp.src(path.php));
	return stream.done().pipe(
		browserSync.reload({
			stream: true,
		})
	);
});

gulp.task("fonts", function () {
	var stream;
	stream = streamqueue({
		objectMode: true,
	});
	stream.queue(gulp.src(path.fonts));
	return stream.done().pipe(gulp.dest("vendors/fonts/"));
});

gulp.task("connect-sync", function (done) {
	browserSync.reload();
	done();
	browserSync.init({
		proxy: "localhost/real-estate", // Change this value to match your local URL.
		socket: {
			domain: "localhost:3000",
		},
	});
	gulp.watch("*.html").on("change", reload);
	gulp.watch("assets/scss/**/*.*").on("change", reload);
});

gulp.task("watch", function () {
	gulp.watch("assets/scss/**/*.*", gulp.series("styles"));
	gulp.watch("assets/fonts/**/*", gulp.series("fonts"));
	gulp.watch("assets/js/**/*.js", gulp.series("scripts"));
});

gulp.task(
	"default",
	gulp.series(
		gulp.parallel("styles", "fonts", "scripts", ["connect-sync"]),
		function () {
			gulp.watch("assets/scss/**/*.*", gulp.series("styles"));
			gulp.watch("assets/fonts/**/*", gulp.series("fonts"));
			gulp.watch("assets/js/**/*.js", gulp.series("scripts"));
		}
	)
);
