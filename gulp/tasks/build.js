
module.exports = (gulp,Plugin,config)=>{

    var sequence  = Plugin.sequence;

    gulp.task('build',['clean'],(callback)=>{
        sequence(
            ['style', 'image','font','vendor'],
            [
                'js.common'
            ],
            [
                'js.index',
                'js.mock'
            ],
            'clean-tpls',
            'html',
            'jsView'
        )(callback);
    });

    gulp.task('js.common',(callback)=>{
        sequence(

            ['tpl:common'],
            ["commonScript"]

        )(callback);
    });


    gulp.task('js.index',(callback)=>{
        sequence(

            ["jsIndex"]

        )(callback);
    });


    gulp.task('js.mock',(callback)=>{
        sequence(
            ["mock"]
        )(callback);
    });



   /* gulp.task('clone-ui-test',(callback)=>{
        sequence('clone-ui','jswallet')(callback);
    });
*/



};


