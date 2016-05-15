angular.module('vinciApp').factory('APIService', function($q, $http,$rootScope) {


    var METHOD = {
        POST: "POST",
        GET: "GET",
        PUT: "PUT",
        DELETE: "DELETE",
        PATCH:"PATCH"
    };


    var TZ = window.TZ || {};

    var papiUrl = TZ.api;

    let createApi = (opts) => {

        let options = {
            method: opts.method || "POST",
            url: opts.apiUrl + opts.url,
            params: opts.params || {},
            data: opts.data || {},
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
            transformRequest: function (data) {
                return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
            },
            cache: false,
            timeout: 100000,
            //withCredentials:true
        }

        //console.log(options);

        return $http(options);
    };

    /**
     * 创建PhpApi
     * @param opts
     * @returns {*}
     */
    let createPApi = (opts, parseData) => {

        opts.apiUrl = papiUrl;

        var req = createApi(opts);
        var deferred = $q.defer();

        req.success(function (data, status, headers, config) {
            if (parseData) {
                data = parseData(data);
            }


            //拦截无权限返回码
            if(data.code != 0){
                $rootScope.notif={
                    text:'没有权限完成此操作',
                    action:'error'
                };
                return false;
            }

            deferred.resolve(data);

        }).error(function (data, status, headers, config) {
            deferred.reject(data); // 声明执行失败，即服务器返回错误
        });
        return deferred.promise;
    };


    /**
     * url中的参数通过params传递，post的参数通过data传递
     */


    /**
     * 参考api请求
     * @param data

     egApi:(data)=>{

            return createPApi({
                method : METHOD.GET,
                url : "/designer/active.html",
                params : {},//URL中的参数
                data : {}//post中的参数

            });
        }
     */

    var userApi = {

        login: (mobile, password) => {
            return createPApi({
                method: METHOD.POST,
                url: "/member/login",
                params: {
                    mobile: mobile,
                    password: password
                }
            });
        },

        register: (mobile, phonecode, token) => {
            return createPApi({
                method: METHOD.POST,
                url: "/member/login",
                params: {
                    mobile: mobile,
                    phonecode: phonecode,
                    token: token
                }
            });
        },

    };


    return {
        user: userApi,
    }


});
