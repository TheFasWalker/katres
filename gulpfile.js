const { series, src } = require('gulp');

let projectFolder = require('path').basename(__dirname),
    gulp = require('gulp'),
    scss = require('gulp-sass')(require('sass')),
    fileinclude = require("gulp-file-include"),
    autoprefixer = require("gulp-autoprefixer"),
    group_media = require("gulp-group-css-media-queries"),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    gulpPug = require('gulp-pug'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    fonter = require('gulp-fonter'),
    fs = require('fs'),
    // uglyfy = require('gulp-uglify')
    // imagemin = require('gulp-imagemin'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin')
    // browsersync = require('browser-sync').create()
    ;



    // пути до файлов
const path = {
    style: {
        src: 'src/scss/style.scss',
        project: projectFolder +'/public/css'
    },
    html: {
        src: ['src/**/*.html', "!" + 'src/**/_*.html'],
        project: projectFolder + '/'
    },
    images: {
        src: 'src/images/**/*.*',
        project: projectFolder + '/public/images/'
    },
    js: {
        src: 'src/scripts/**/*.js',
        project: projectFolder + '/public/scripts/'
    },
    pugToHtml: {
        src: ['src/**/*.html', "!" + 'src/**/_*.html'],
        project: projectFolder + '/'
    },
    fonts: {
        src:'src/fonts/**/*.ttf',
        project: projectFolder + '/public/fonts/'

    }
}
// компилируем scss в css
gulp.task('compile-scss', function () {
    return gulp.src(path.style.src)
        .pipe( sourcemaps.init())
        .pipe(scss({
            outputStyle: "expanded"
        }))
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 4 versions"],
            cascade: true
        }))
        .pipe(group_media())
        .pipe( sourcemaps.write())
        .pipe(gulp.dest(path.style.project))

});

// сборка html
gulp.task('compile-html', function () {
    return gulp.src(path.html.src)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(path.html.project))
});

//cборка pug->html
gulp.task('compile-pug', function () {
    return gulp.src(path.pugToHtml.src)
        .pipe(gulpPug({
            pretty:true
        }))
        .pipe(gulp.dest(path.html.project))
});

// обработка js
gulp.task('compile-js', function () {
    return gulp.src(path.js.src, {
        sourcemaps:true
    })
        .pipe(babel())
        .pipe(concat('script.js'))
        .pipe(gulp.dest(path.js.project))
})

// работа со шрифтами
gulp.task('otf2ttf', function () {
    return gulp.src([path.fonts.src + 'src/fonts/*.otf'])
        .pipe(fonter({
            formats:['ttf']
        }))
        .pipe(gulp.dest(path.fonts.src))
})
function converFonts() {
    src(path.fonts.src)
        .pipe(ttf2woff())
        .pipe(gulp.dest(path.fonts.project));
    return  src(path.fonts.src)
    .pipe(ttf2woff2())
    .pipe(gulp.dest(path.fonts.project));
}
function replaseFonts() {
    src('src/fonts/**/*.ttf')
        .pipe(gulp.dest(path.fonts.project));
}
function fontsStyle() {
    let file_content = fs.readFileSync('src/scss/fonts.scss');
    if (file_content == '') {
        fs.writeFile('src/scss/fonts.scss', ' ', cb);
        return fs.readdir('src/fonts/', function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++){
                    let fontname = items[i].split('.')
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile('src/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}
function cb(){}

//  минификация изображений
gulp.task('imagemin', function () {
    return gulp.src(path.images.src)
        .pipe(newer(path.images.project))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: true }],
            optimisationLevel: 3
        }))
        .pipe(gulp.dest(path.images.project))
})

function watchCanges() {
    gulp.watch('src/scss/**/*.scss', gulp.series('compile-scss'));
    gulp.watch('src/**/*.html', gulp.series('compile-html'));
    gulp.watch(path.images.src , gulp.series('imagemin'));
    gulp.watch('src/scripts/*.js', gulp.series('compile-js'));
}
function watchChangesPug() {
    gulp.watch('src/scss/**/*.scss', gulp.series('compile-scss'));
    // gulp.watch('src/**/*.html', gulp.series('compile-html'));
    gulp.watch(path.images.src , gulp.series('imagemin'));
    gulp.watch('src/scripts/*.js', gulp.series('compile-js'));
    gulp.watch('src/**/*.pug', gulp.series('compile-pug'));
}
function compileFonts() {
    converFonts();
    replaseFonts();
    fontsStyle()
}

gulp.task('default', gulp.series(watchCanges));
gulp.task('pug', gulp.series(watchChangesPug));
gulp.task('fonts', gulp.series(compileFonts));


