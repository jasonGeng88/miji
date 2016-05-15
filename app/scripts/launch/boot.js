var launchApp = angular
    .module('launch', [
        'ngCookies','vinciApp',
        'ui.router', 'common-tpl'
    ], ($httpProvider) => {
        // Use x-www-form-urlencoded Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';


        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
    })
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider

            .state("index", {
                url: '/index',
                templateUrl: '/views/launch/index.html',
                controller: 'indexCtrl'
            })
            .state("login", {
                url: '/login',
                templateUrl: '/views/launch/login/login.html',
                controller: 'loginCtrl'
            }).state("register", {
                url: '/register',
                templateUrl: '/views/launch/login/login.html',
                controller: 'loginCtrl'
            });

        $urlRouterProvider

            .when("/index", '/index')

            .when("/login", '/login')
            .when("/register", '/register')

            .otherwise('/index');

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
       //mock conflict
       // $httpProvider.interceptors.push('commonInterceptor');
    });