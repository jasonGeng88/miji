
module.exports=(gulp,Plugin,config)=>{
    gulp.task('image', () => {
        return gulp.src(config.src+'/images/**/*')
            .pipe(gulp.dest(config.dest+'/images'));
    });
}

