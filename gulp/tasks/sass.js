
module.exports = (gulp,Plugin,config)=>{

    var sass = Plugin.sass;
    var sourcemaps= Plugin.sourcemaps;
    var autoprefixer = Plugin.autoprefixer;
    var rev = Plugin.rev;
    var revCollector = Plugin.revCollector;
    var gulpif= Plugin.gulpif;
    var sassAssets= Plugin.sassAssets;


    var debug = config.debug;



    var asset_host = function(http_path, done) {

        console.log(http_path);
        done(config.assets.cdn);
    };

    var assetsOption = {

        asset_host:asset_host,
        http_images_path: config.dest+'/images',
        http_fonts_path: config.dest+'/fonts'

    };


    if(debug){
        gulp.task('style', () => {
            const opts = {
                functions: sassAssets(assetsOption),
                outputStyle: 'compressed'
            };
            return gulp.src(config.src+'/styles/**/*.scss')
                .pipe(sourcemaps.init())
                .pipe(sass(opts))
                .pipe(autoprefixer())
                .pipe(sourcemaps.write())

                .pipe(gulp.dest(config.dest+'/styles'))

        });
    }else{
        gulp.task('style', () => {
            const opts = {
                functions: sassAssets(assetsOption),
                outputStyle: 'compressed'
            };
            return gulp.src(config.src+'/styles/**/*.scss')

                .pipe(sass(opts))
                .pipe(autoprefixer())

                .pipe(rev())
                .pipe(gulp.dest(config.dest+'/styles'))
                .pipe( rev.manifest() )
                .pipe( gulp.dest( 'rev/styles' ) );
        });
    }

};


