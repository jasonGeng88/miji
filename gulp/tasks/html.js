
module.exports = (gulp,Plugin,config)=>{

    var revCollector= Plugin.revCollector;
    var minifyHtml= Plugin.minifyHtml;
    var gulpif = Plugin.gulpif;

    var template = Plugin.template;


    var assetConfig = config.getAssets(config);


    console.log(assetConfig);


    var prod = !config.debug;


    if(config.debug){
        gulp.task('html', function () {
            const opts = {
                conditionals: true,
                loose: true
            };
            return gulp.src([ config.src+'/*.html'])
                .pipe(template({assets:assetConfig}))
                .pipe(minifyHtml(opts))
                .pipe( gulp.dest(config.dest) );
        });

    }else{
        gulp.task('html', function () {
            const opts = {
                conditionals: true,
                loose: true
            };
            return gulp.src(['rev/**/*.json', config.src+'/*.html'])
                .pipe( revCollector({
                    replaceReved: true,
                    dirReplacements: {
                        // 'styles': 'dist/styles',
                        //'/js/': '/dist/js/',
                        /* 'static.tezign.com/': function(manifest_value) {
                         return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'tezign.com' + '/img/' + manifest_value;
                         }*/
                    }
                }) )
                .pipe(template({assets:assetConfig}))
                .pipe(minifyHtml(opts))
                .pipe( gulp.dest(config.dest) );
        });

    }




}


