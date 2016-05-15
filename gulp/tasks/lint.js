
module.exports = (gulp,plugins,config)=>{

    var jshint = plugins.jshint ;

    gulp.task('lint', function() {
        return gulp.src(config.src+'/**/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });


}