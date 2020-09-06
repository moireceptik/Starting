/* ==============================================================
   ================== Gulp ======================================
 * ============================================================ */

var gulp         = require('gulp'), //Подключаем Gulp
    pug          = require('gulp-pug'), //Подключаем Pug пакет
    sass         = require('gulp-sass'), //Подключаем Sass пакет
    browserSync  = require('browser-sync'), // Подключаем Browser Sync (LiveReload страниц)
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    minifyCss    = require('gulp-minify-css'), // Подключаем gulp-minify-css (для сжатия CSS)
    uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
    notify       = require('gulp-notify'), // Подключаем сообщения об ошибке
    imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
		autoprefixer = require('gulp-autoprefixer'), // Подключаем библиотеку для автоматического добавления префиксов
		sourcemaps   = require('gulp-sourcemaps'), // Подключаем карту
		spritesmith  = require('gulp.spritesmith'); // Генератор CSS спрайтов

/* ==============================================================
   ================== Task ======================================
 * ============================================================ */

gulp.task('pug', function(){
		return gulp.src('app/_pug/*.pug') // Берем все pug файлы из папки _pug (дочерние не трогаем)
        .pipe(pug({
            pretty: true // запрещаем минифицировать pug
				}).on("error", notify.onError()))
        .pipe(gulp.dest('app')) // Выгружаем результаты в папку app
        .pipe(browserSync.reload({stream: true})) // Обновляем HTML на странице при изменении
});

gulp.task('sass', function(){
		return gulp.src('app/_sass/*.sass') // Берем все sass файлы из папки _sass (дочерние не трогаем)
				.pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded' // Указываем формат css. Default: nested. Values: nested, expanded, compact, compressed
        }).on("error", notify.onError()))
				.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
				.pipe(sourcemaps.write())
        .pipe(gulp.dest('app/assets/css')) // Выгружаем результаты в папку app/assets/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('css', function() {
	return gulp.src([
			'app/assets/vendor/bootstrap/dist/css/bootstrap.min.css'
			])
			.on('error', console.log)
			.pipe(concat('vendor.css')) // Собираем их в кучу в новом файле
			.pipe(gulp.dest('app/assets/css'))
			.pipe(rename({suffix: ".min"}))
			.pipe(minifyCss()) // Сжимаем CSS файл
			.pipe(gulp.dest('app/assets/css'));
});

gulp.task('js', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'app/assets/vendor/jquery/dist/jquery.min.js',
        'app/assets/vendor/bootstrap/dist/js/bootstrap.min.js',
				'app/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js'
        ])
				.pipe(concat('vendor.js')) // Собираем их в кучу в новом файле
				.pipe(gulp.dest('app/assets/js')) // Выгружаем в папку app/assets/js
				.pipe(rename({suffix: ".min"}))
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/assets/js')); // Выгружаем в папку app/assets/js
});

gulp.task('img', function() {
    return gulp.src('app/assets/images/**/*') // Берем все изображения из app/assets/
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/assets/images')); // Выгружаем на продакшен
});

gulp.task('sprite', function() {
	var spriteData = 
		gulp.src('app/assets/images/sprite/*.*') // путь, откуда берем картинки для спрайта
			.pipe(spritesmith({
				imgName: 'sprite.png',
				cssName: '_sprite.sass',
				imgPath: '../images/sprite.png',
				padding: 0,
				cssFormat: 'sass',
				algorithm: 'binary-tree',
				cssVarMap: function(sprite) {
					sprite.name = 's-' + sprite.name
				}
			}));
	spriteData.img.pipe(gulp.dest('app/assets/images/')); // путь, куда сохраняем картинку
	spriteData.css.pipe(gulp.dest('app/_sass/base/')); // путь, куда сохраняем стили
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: true // показать уведомления true/false
    });
});

gulp.task('watch', function() {
    gulp.watch('app/_pug/**/*.pug', gulp.parallel('pug')); // Наблюдение за pug файлами в папке _pug
    gulp.watch('app/_sass/**/*.sass', gulp.parallel('sass')); // Наблюдение за sass файлами в папке _sass
    gulp.watch('app/assets/images/sprite/*.*', gulp.parallel('sprite')); // Наблюдение за спрайтами
    gulp.watch('app/assets/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
    gulp.watch('app/assets/svg/**/*.svg', browserSync.reload); // Наблюдение за SVG файлами в папке svg
});

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('export', function() {

	var distCss = gulp.src('app/assets/css/**/*') // Переносим библиотеки в продакшен
	.pipe(gulp.dest('dist/assets/css'))

	var distFonts = gulp.src('app/assets/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/assets/fonts'))

	var distJs = gulp.src('app/assets/js/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/assets/js'))

	var distSvg = gulp.src('app/assets/svg/**/*') // Переносим svg в продакшен
	.pipe(gulp.dest('dist/assets/svg'))

	var distHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));

});

gulp.task('clear', function (done) {
	return cache.clearAll(); // Чистим кеш Gulp
	done();
});

gulp.task('dist', gulp.parallel('clean', 'img', 'pug', 'sass', 'css', 'js', 'export'));

gulp.task('default', gulp.parallel('pug', 'sass', 'css', 'js', 'sprite', 'browser-sync', 'watch'));
