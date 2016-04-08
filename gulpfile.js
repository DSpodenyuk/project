var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    coffee = require('gulp-coffee'),
    bourbon = require('node-bourbon'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    spritesmith = require('gulp.spritesmith'),
    browserSync = require('browser-sync').create();

var path = {
    built: '',
    css: 'css',
    img: 'img',
    js: 'js',
    jade: 'source/jade',
    sprite: 'source/sprites',
    sass: 'source/sass',
    coffee: 'source/coffee'
}

gulp.task('serve', function() {

    browserSync.init({
        server: path.built
    });

    gulp.watch(path.built + "*.html").on('change', browserSync.reload);
    gulp.watch(path.css + "/*.css").on('change', browserSync.reload);
    gulp.watch(path.img + '/**/*').on('change', browserSync.reload);
    gulp.watch(path.js + "/*.js").on('change', browserSync.reload);

});

gulp.task('jade', function() {
    gulp.src(path.jade + '/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(path.built))
        .pipe(browserSync.stream());
});

gulp.task('sass', function() {
    gulp.src(path.sass + '/*.sass')
        .pipe(sass({
            includePaths: require('node-bourbon').includePaths
        }))
        .pipe(gulp.dest(path.css))


    gulp.src(path.sass + '/*.sass')
        .pipe(sass({
            includePaths: require('node-bourbon').includePaths,
            outputStyle: 'compressed'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.css))
        .pipe(browserSync.stream());
});

gulp.task('coffee', function() {
    gulp.src(path.coffee + '/**/*.coffee')
        .pipe(coffee({
            bare: true
        }))
        .pipe(gulp.dest(path.js));

    gulp.src(path.coffee + '/**/*.coffee')
        .pipe(coffee(/*{
			bare: true
		}*/))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.js))
        .pipe(browserSync.stream());
});

gulp.task('sprite', function() {
    var spriteData = gulp.src(path.sprite + '/*.png')
        .pipe(spritesmith({
            imgName: 'main-sprite.png',
            cssName: '_icons.sass',
            padding: 1,
            cssFormat: 'sass',
            imgPath: 'img/main-sprite.png',
            cssVarMap: function(sprite) {
                sprite.name = 's-' + sprite.name;
            }
        }));

    spriteData.img.pipe(gulp.dest(path.img));
    spriteData.css.pipe(gulp.dest(path.sass + '/moduls'));
});

gulp.task('watch', function() {
    gulp.watch(path.sass + '/**/*.sass', ['sass']);
    gulp.watch(path.jade + '/**/*.jade', ['jade']);
    gulp.watch(path.coffee + '/*', ['coffee']);
    gulp.watch(path.sprite + '/*', ['sprite']);
});


gulp.task('default', ['serve', 'jade', 'sass', 'coffee', 'sprite', 'watch']);
