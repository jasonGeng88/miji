
module.exports = (gulp,Plugin,config)=>{

    gulp.task('watch',function () {



console.log("watch ----- " + config.src);
        //监控css，img
        gulp.watch(config.src+'/styles/**/*.scss', ['style']);

        gulp.watch(config.src+'/images/**/*', ['image']);



        //watch：js，tpl
        gulp.watch(config.src+"/scripts/common/**",['js.common']);
        gulp.watch(config.src+"/scripts/launch/**",['js.index']);
        gulp.watch(config.src+"/scripts/mocks/**", ['js.mock']);

        gulp.watch(config.src+"/scripts/**/*.html",['tpl:common']);




        //watch:enter.index
        gulp.watch(config.src+'/*.html', ['html']);




    });
};






