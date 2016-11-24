var gulp = require('gulp'),
    handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    concat = require('gulp-concat'),
    path = require('path'),
    connect = require('gulp-connect-multi')(),
    config = require('./config.js').config;

/**
 * 	@task webserver
 *	@description
 * WebServer levanta el navegador una vez se ejecute un cambio en los archivos del proyecto
 * */
gulp.task('webserver', connect.server({
    root: [config.app],
    port: 7777,
    livereload: true,
    open: {
        browser: 'chrome' // if not working OS X browser: 'Google Chrome' 
    }
}));


/**
 *	@task css
 *	@description
 *	Tarea que visualiza los cambios realizados en los archivos html y refresca el servidor gulp-connect
 */
gulp.task('js', function () {
    gulp.src(config.app + '/*.js')
        .pipe(connect.reload());
});

/**
 *	@task css
 *	@description
 *	Tarea que visualiza los cambios realizados en los archivos html y refresca el servidor gulp-connect
 */
gulp.task('html', function () {
    gulp.src(config.app + '/*.html')
        .pipe(connect.reload());
});

/**
 *	@task css
 *	@description
 *	Tarea que visualiza los cambios realizados en los archivos css y refresca el servidor gulp-connect
 */
gulp.task('css', function () {
    gulp.src(config.css + '/*.css')
        .pipe(connect.reload());
});

/**
 *	@task templates
 *	@description
 *	Tarea que procesa todos los archivos de templates
 */
gulp.task('templates', function () {
    gulp.start('handlebars');
});

/**
 *	@task handlebars
 *	@description
 *	Tarea que procesa todos los archivos Handlebars con la extension .hbs
 *  Depende de la tarea [themes]
 */
gulp.task('handlebars', function () {
    var modules = gulp.src(config.templates + '/*.handlebars')
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'Gallery.templates',
            noRedeclare: true, // Avoid duplicate declarations 
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(config.templatesDest))
        .pipe(connect.reload()),

        // Assume all partials start with an underscore 
        // You could also put them in a folder such as source/templates/partials/*.hbs 
        partials = gulp.src(config.partials + '/*.handlebars')
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap(
            '(function(){ Handlebars.registerPartial(<%= processPartialName(file.relative) %>, ' +
            'Handlebars.template(<%= contents %>)); ' +
            'return Handlebars.partials[<%= processPartialName(file.relative) %>] })()', {}, {
                imports: {
                    processPartialName: function (fileName) {
                        // Strip the extension and the underscore 
                        // Escape the output with JSON.stringify 
                        return JSON.stringify(path.basename(fileName, '.js'));
                    }
                }
            }))
        .pipe(declare({
            namespace: 'Gallery.partials',
            noRedeclare: true, // Avoid duplicate declarations 
        }))
        .pipe(concat('partials.js'))
        .pipe(gulp.dest(config.templatesDest))
        .pipe(connect.reload());

});

/**
 * watch  
 * Tarea para procesar los archivos al terminar levante un navegador web
 */
gulp.task('watch', ['webserver'], function () {
    gulp.watch([config.app + '/**/*.html'], ['html']);
    gulp.watch([config.app + '/**/*.js'], ['js']);
    gulp.watch([config.app + '/**/*.css'], ['css']);
    gulp.watch([config.app + '/**/*.handlebars'], ['handlebars']);
});

/**
 * @task default
 *	@description
 *	Tarea principal para ejecutar los modulos y templates
 * 
 */
gulp.task('default', ['templates', 'watch']);