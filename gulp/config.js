/**
 * 页面中引用的assets资源的路径层级 cdn+dev
 * @type {{cdn: string, dev: string, dest: string}}
 */
var assets={
    cdn:'',
    api:'',
    domain:"",


    dev : '__dev',
    pro:'dist'

};


var src='./app';
var tplsSrc = "./.tpls";

var scriptsModule = {
    index:[
        src + '/scripts/launch/**/*.js',
    ],

    common: [
        //tplsSrc + '/*.js',
        src + '/scripts/common/boot.js',
        src + '/scripts/common/api/**/*.js',
        src + '/scripts/common/basis/**/*.js',
        src + '/scripts/common/constants/**/*.js',
        src + '/scripts/common/directives/**/*.js',
        src + '/scripts/common/filters/**/*.js',
        src + '/scripts/common/help/**/*.js',
        src + '/scripts/common/protocols/**/*.js',
        src + '/scripts/common/services/**/*.js',
        src + '/scripts/common/users/**/*.js',
        src + '/scripts/libs/**/*.js'
    ],
    mock:[
        src + '/scripts/mocks/js/mock.js',
        src + '/scripts/mocks/js/mock.angular.js',
        src + '/scripts/mocks/data/*.js'
    ],

};


module.exports = {

    /**
     * 源码路径
     */
    src:src,

    /**
     * 默认的编译路径：在gulp执行时，根据环境参数设置
     */
    dest:"",

    /**
     * bower路径
     */
    bower:{
        src:'./bower_components'
    },

    /**
     * node_modules路径
     */
    nodeModules:{
        src:'./node_modules'
    },

    module:{
        scripts:scriptsModule
    },

    /**
     * 物理路径:最终编译的目标路径（开发，生产）
     */
    build:{
        dev:'./'+assets.dev,
        pro:'./'+assets.pro
    },


    assets:assets,




    /**
     * 页面需要替换的路径
     * @param cfg
     * @returns {{vendor: string, scripts: string, styles: string, tpls: string, images: string}}
     */
    getAssets:function(cfg){

        let assets = cfg.assets;
        let dest = cfg.debug ? assets.dev : assets.pro;

        return {
            domain:assets.domain,
            api:assets.api,
            cdn:assets.cdn,
            isPro:assets.isPro,
            vendor: assets.cdn + "/"+ dest+'/vendor',
            scripts: assets.cdn + '/' + dest+"/scripts",
            styles: assets.cdn + '/' + dest+"/styles",
            //tpls: assets.cdn + '/' + dest+"/views",
            tpls: assets.cdn + "/.tpls",
            images:assets.cdn + '/'+dest+"/images"
        }

    }




};