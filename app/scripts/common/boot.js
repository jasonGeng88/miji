angular
    .module('vinciApp', [
        'ngCookies',
        'ui.router','common-tpl'

    ], ($httpProvider) => {
        // Use x-www-form-urlencoded Content-Type
        //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';


        // Override $http service's default transformRequest
        //$httpProvider.defaults.transformRequest = [function(data) {
        //    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        //}];
    })
    .constant("BizStatus",{
        Quote:{
            ToQuote:"1",//项目等待您的报价
            Quoted:"2",//你已报价
            NoSelected:"3",//    你的合作意向未被客户选中
            NoQuote:"4",//项目已对接结束
            Selected:"5"//你的合作意向已被客户选中
        },
        QuoteView:{
          Viewed:"1",//你的合作意向已被客户查看
           NoView:"0"//你已报价，等待客户回应
        },
        Project:{
            Draft:6,//草稿
            ToPay:7,//待支付
            ToApprove:1,//待审核
            Reject:2,//审核未通过
            Join:3,//对接中
            JoinSuccess:4,//对接成功
            Invalid:5,//已失效


        },
        ProjectPlan:{
            Contract:0,//未生成项目管理信息
            Will:1,//即将开始
            Doing:2,//进行中
            ToConfirm:3,//待确认
            Finish:4,//项目完成
            Stopped:5//项目终止
        },
        Plan:{
            NotBegin:1,//未开始
            Doing:2,//进行中:待客户资金托管或待设计师提交作品或待设计师提交源文件
            ToConfirm:3,//客户已确认作品
            Stop:4,//设计师同意终止项目
            Money:5,//客户已资金托管
            Uploaded:6,//设计师已提交作品或设计师已提源文件
            ClientApplyStop:7,//阶段进行中客户申请项目终止
            DesignerApplyStop:8,//阶段待确认客户申请项目终止
            ClientRejectSourcePsd:9//源文件阶段待确认客户申请项目退回
        },
        Contract:{
            NotExist:  0,//	不存在
            Draft:  1,//	草稿
            ClientCheckCore:  2,//	客户审核合同核心中
            ClientRejectCore:  3,//	客户拒绝合同核心，打回给设计师
            ClientApproveCore:  4,//	客户确认通过合同核心,发给设计师
            ClientCheckMain:  5,//	客户审核合同
            ClientRejectMain:  6,//	客户拒绝合同,打回设计师
            Success:8//|特赞审核通过|
        }
    })
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('error', {
                url: '/error',
                templateUrl: '/views/common/basis/error.html',
                controller: 'errorCtrl'
            })
            .state('404', {
                url: '/404',
                templateUrl: '/views/common/basis/404.html',
                controller: 'notfoundCtrl'
            })
            .state('500', {
                url: '/500',
                templateUrl: '/views/common/basis/500.html',
                controller: 'norAuthCtrl'
            })
            .state('expired', {
                url: '/expired',
                templateUrl: '/views/common/basis/expired.html',
                controller: 'expiredCtrl'
            })
            .state('loading', {
                url: '/loading',
                templateUrl: '/views/common/basis/loading.html',
                controller: 'loadingCtrl'
            })





    })
    .config(function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            'http://static.tezign.com/**',
            'http://192.168.199.161:8019/**',
            'http://127.0.0.1/**'
        ]);
    })
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('commonInterceptor');
    });

//收集JS错误日志
window.onerror = function(errorMessage, url, line) {
    var loggerUrl = TZ.japi+"/log/web";
    var parameters = "?des=" + escape(errorMessage)
        + "&url=" + escape(url)
        + "&line=" + escape(line)
        + "&parent_url=" + escape(document.location.href)
        + "&agent=" + escape(navigator.userAgent);

    /** Send error to server */
    new Image().src = loggerUrl + parameters;
};