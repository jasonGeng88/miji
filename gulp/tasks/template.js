
module.exports = (gulp,Plugin,config)=>{

    var minifyHtml = Plugin.minifyHtml;


    var sequence= Plugin.sequence;
    var ngTemplate = Plugin.ngTemplate;
    var template = Plugin.template;
    var gulpif = Plugin.gulpif;
    var prod = !config.debug;



    var tplDest = "./.tpls/";

    var assetConfig = config.getAssets(config);


    /**
     * 不做为编译使用
     */
    gulp.task('jsView',(callback)=>{
        sequence([
            'tpl:common',
        ])(callback);
    });

    gulp.task('tpl:common', () => {

        return gulp.src(config.src+'/scripts/**/*.html')
            .pipe(template({assets:assetConfig}))
            .pipe(minifyHtml({empty: true, quotes: true}))
            .pipe(ngTemplate({
                moduleName: 'common-tpl',
                standalone: true,
                prefix:"/views/",
                filePath: 'common-tpl.js'
            }))
            .pipe(gulp.dest(tplDest));

    });

}

