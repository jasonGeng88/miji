
module.exports = (gulp,Plugin,config)=> {


    var gulpif = Plugin.gulpif;

    var concat = Plugin.concat;
    var babel = Plugin.babel;
    var rev = Plugin.rev;
    var uglify = Plugin.uglify;
    var ngAnnotate = Plugin.ngAnnotate;
    var stripDebug = Plugin.stripDebug;
    var ngmin = Plugin.ngmin;


    var debug = config.debug;



    var indexScripts = config.module.scripts.index;
    var commonScript = config.module.scripts.common;

    var mockScript = config.module.scripts.mock;

    var scriptTasks = {
        "jsIndex": {
            source: indexScripts,
            file: "index.js"
        },
        "commonScript": {
            source: commonScript,
            file: "common.js"
        },
        "mock": {
            source: [],
            file:"mock.js"
        }
    }

    if (debug) {

        //console.log('config src -- ' + config.src);

        scriptTasks["mock"] = {
            source: mockScript,
            file:"mock.js"
        }

        for (let task in scriptTasks) {
            console.log(task);
            gulp.task(task, () => {
                return gulp.src(scriptTasks[task].source)
                    .pipe(babel())
                    .pipe(ngAnnotate())
                    .pipe(ngmin({dynamic: false}))

                    .pipe(concat(scriptTasks[task].file))

                    .pipe(gulp.dest(config.dest + '/scripts'))
            });
        }

    } else {

        for (let task2 in scriptTasks) {
            gulp.task(task2, () => {
                return gulp.src(scriptTasks[task2].source)
                    .pipe(babel())


                    .pipe(ngAnnotate())
                    .pipe(ngmin({dynamic: false}))

                    .pipe(stripDebug())
                    .pipe(uglify({outSourceMap: false}))
                    .pipe(concat(scriptTasks[task2].file))

                    .pipe(rev())
                    .pipe(gulp.dest(config.dest + '/scripts'))

                    .pipe(rev.manifest())
                    .pipe(gulp.dest('rev/scripts/' + task2));

            });
        }

    }


}

