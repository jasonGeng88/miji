import gulp     from 'gulp';
import plugins  from 'gulp-load-plugins'; // 用于模块加载：1. 根据package.json加载 2. 按需加载
import fs       from 'fs';

import optimist from 'optimist'; // 便于操作由命令行传递的参数


//gulp-project-plugins
import clean        from 'gulp-clean';
import browserSync  from 'browser-sync';
// Static asset revision data collector from manifests, generated from different streams, and replace their links in html template.
import revCollector from 'gulp-rev-collector';
import minifyHtml   from 'gulp-minify-html';
import sass         from 'gulp-sass'; // compile your Sass files (synchronously)
import sourcemaps   from 'gulp-sourcemaps'; //  to generate source maps for the Sass to CSS compilation
import autoprefixer from 'gulp-autoprefixer'; // Prefix CSS
import rev          from 'gulp-rev'; //Static asset revisioning by appending content hash to filenames
import concat       from 'gulp-concat';
import babel        from 'gulp-babel';
import uglify       from 'gulp-uglify';
import ngAnnotate   from 'gulp-ng-annotate'; // 根据'ngInject'注释（语句），将判断型注入转成声明式注入
import stripDebug   from 'gulp-strip-debug';
import ngmin        from 'gulp-ngmin';
import jshint       from 'gulp-jshint';
import gulpif       from 'gulp-if';
import template     from 'gulp-template';
import sequence     from 'gulp-sequence'; // Run a series of gulp tasks in order
import sassAssets   from 'node-sass-asset-functions';
import minifyCss    from 'gulp-minify-css';

import ngTemplate from 'gulp-ng-template';

import git from 'gulp-git';

var argv = optimist.argv;

import config from  './gulp/config.js';


/* 这种方式使得模块懒加载（必要时加载） */
plugins.clean           = clean;
plugins.browserSync     = browserSync;
plugins.revCollector    = revCollector;
plugins.minifyHtml      = minifyHtml;
plugins.sass            = sass;
plugins.sourcemaps      = sourcemaps;
plugins.autoprefixer    = autoprefixer;
plugins.rev             = rev;
plugins.concat          = concat;
plugins.babel           = babel;
plugins.uglify          = uglify;
plugins.ngAnnotate      = ngAnnotate;
plugins.stripDebug      = stripDebug;
plugins.ngmin           = ngmin;
plugins.jshint          = jshint;
plugins.gulpif          = gulpif;
plugins.template        = template;
plugins.sequence        = sequence;
plugins.sassAssets      = sassAssets;
plugins.ngTemplate      = ngTemplate;
plugins.git             = git;
plugins.minifyCss       = minifyCss;


/**
 * 根据用户设置的 --type的参数值，设置开发环境，还是生产环境
 *
 *
 * gulp --type=d, gulp --type=p
 *
 * @param cfg
 */


var initBuildConfig = (cfg)=>{

    //决定生成的环境的目录



    let envType = argv["env"] || "dev";

    if(envType == "dev"){

        cfg.dest = cfg.build.dev;
        cfg.debug = true;
        cfg.assets.api = 'http://www.angular-local.com';
        cfg.assets.domain = 'http://www.angular-local.com/__dev';
        cfg.assets.cdn = 'http://www.angular-local.com';

    }else if(envType == "pro"){
        cfg.dest = cfg.build.dev;
        cfg.debug = false;
        cfg.assets.api = 'http://www.angular-local.com';
        cfg.assets.domain = 'http://www.angular-local.com/__dev';
        cfg.assets.cdn = 'http://www.angular-local.com';
    }

};


initBuildConfig(config);

var gulpTaskList = fs.readdirSync('./gulp/tasks/');

gulpTaskList.forEach(function(taskfile) {
    require('./gulp/tasks/' + taskfile)(gulp, plugins, config);
});
