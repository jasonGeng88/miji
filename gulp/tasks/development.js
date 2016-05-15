
module.exports = (gulp,Plugin,config)=>{

    var browserSync = Plugin.browserSync;


    const reload = browserSync.reload;

    gulp.task('serve', ['build', 'watch'], () => {
        browserSync({
            notify: true,
            port: 8181,
            server: {
                baseDir: ['.'],
                routes: {
                    '/bower_components': 'bower_components'
                }
            }
        });

        gulp.watch([
            config.desc+'/*.html',
            config.desc+'/views/*.html',
            config.desc+'/styles/**/*.css',
            config.desc+'/scripts/**/*.js',
            config.desc+'/images/**/*'
        ]).on('change', reload);

    });







};


