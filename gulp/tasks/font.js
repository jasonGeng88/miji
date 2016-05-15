

module.exports = (gulp,Plugin,config)=>{
    gulp.task('font', () => {
        return gulp.src(config.src+'/fonts/**/*')
            .pipe(gulp.dest(config.dest+'/fonts'));
    });
}


