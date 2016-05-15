
module.exports = (gulp,Plugin,config)=>{

    var minifyHtml = Plugin.minifyHtml;
    var minifyCss = Plugin.minifyCss;
    var sequence  = Plugin.sequence;
    var gulpif = Plugin.gulpif;
    var prod = !config.debug;

    gulp.task('vendor',[
        'trd-plugin',
        'ng-module',
        'font-awesome',
        'ng-datepicker',
        'ng-img-crop',
        'swiper',
        'Sortable',
        'mobile-angular-ui',
        'other'
    ]);





    gulp.task('trd-plugin', () => {


        return gulp.src([

            //scripts
            config.bower.src+'/jquery/dist/jquery.min.js',
            config.bower.src+'/bootstrap/dist/js/bootstrap.min.js',
            config.bower.src+'/bootbox/bootbox.js',
            config.bower.src+'/modernizr/modernizr.js',

        ], { base: config.bower.src }).pipe(gulp.dest(config.dest+'/vendor'));
    });
    gulp.task('ng-module', () => {


        return gulp.src([

            config.bower.src+'/angular/angular.min.js',
            config.bower.src+'/angular-ui-router/release/angular-ui-router.min.js',
            config.bower.src+'/angular-cookies/angular-cookies.min.js',

            config.bower.src+'/angular-bootstrap/ui-bootstrap-tpls.min.js',

            config.bower.src+'/angular-utf8-base64/angular-utf8-base64.min.js',

        ], { base: config.bower.src }).pipe(gulp.dest(config.dest+'/vendor'));
    });

    gulp.task('font-awesome', () => {


        return gulp.src([

            //styles
            config.bower.src+'/font-awesome/css/font-awesome.min.css',
            config.bower.src+'/font-awesome/fonts/**'


        ], { base: config.bower.src }).pipe(gulp.dest(config.dest+'/vendor'));
    });


    gulp.task('ng-datepicker', () => {


        return gulp.src([

            config.bower.src+'/angular-native-datepicker/build/angular-datepicker.js',
            config.bower.src+'/angular-native-datepicker/build/themes/default.css',
            config.bower.src+'/angular-native-datepicker/build/themes/default.date.css',
            config.bower.src+'/angular-native-datepicker/build/themes/classic.css',
            config.bower.src+'/angular-native-datepicker/build/themes/classic.date.css'


        ], { base: config.bower.src }).pipe(gulp.dest(config.dest+'/vendor'));
    });

    gulp.task('ng-img-crop', () => {


        return gulp.src([


            config.bower.src+'/ng-img-crop/compile/minified/ng-img-crop.js',
            config.bower.src+'/ng-img-crop/compile/minified/ng-img-crop.css'

        ], { base: config.bower.src }).pipe(gulp.dest(config.dest+'/vendor'));
    });

    gulp.task('swiper', () => {


        return gulp.src([



            config.bower.src+'/swiper/dist/js/swiper.min.js',
            config.bower.src+'/swiper/dist/css/swiper.min.css'

        ], { base: config.bower.src }).pipe(gulp.dest(config.dest+'/vendor'));
    });
    gulp.task('Sortable', () => {


        return gulp.src([


            config.bower.src+'/Sortable/ng-sortable.js',
            config.bower.src+'/Sortable/Sortable.min.js'

        ], { base: config.bower.src }).pipe(gulp.dest(config.dest+'/vendor'));
    });

    gulp.task('mobile-angular-ui', () => {


        return gulp.src([


            config.bower.src+'/mobile-angular-ui/dist/**'

        ], { base: config.bower.src }).pipe(gulp.dest(config.dest+'/vendor'));
});

    gulp.task('other', () => {


        return gulp.src([





            config.bower.src+'/ng-file-upload/ng-file-upload.min.js',
            config.bower.src+'/moment/min/moment.min.js',
            config.bower.src+'/jquery-param/jquery-param.min.js',
            config.bower.src+'/md5/build/md5.min.js'


        ], { base: config.bower.src }).pipe(gulp.dest(config.dest+'/vendor'));
    });

    gulp.task('node_modules', () => {


        return gulp.src([

            config.nodeModules.src+'/md5/md5.js'

        ], { base: config.nodeModules.src }).pipe(gulp.dest(config.dest+'/vendor'));
    });




};