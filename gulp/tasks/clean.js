
module.exports = (gulp,Plugin,config)=>{

    var clean = Plugin.clean;

    let options = {
        read:false
    };



    var debug = config.debug;


    var cleanFiles = [];
    if(debug){
        cleanFiles=[config.dest];
    }else{
        cleanFiles=   [
            config.dest,
            './rev'
        ]
    }


    gulp.task('clean', () => {
        return gulp.src(cleanFiles, options)
            .pipe(clean({
                force: true
            }));
    });


    gulp.task('clean-tpls', () => {
        return gulp.src(['./.tpls'], options)
            .pipe(clean({
                force: true
            }));
    });
};