angular.module('vinciApp').factory('commonInterceptor',function($q) {
    return {
        //request: function (config) {
        //    return config;
        //},
        //
        //response: function (response) {
        //
        //    //if (response.code == "401") {
        //    //
        //    //    authService.clear();
        //    //    location.href = "account.html#/login";
        //    //
        //    //} else if (response.code == 403) {
        //    //    authService.clear();
        //    //    location.href = 'account.html#/login';
        //    //    return false;
        //    //} else {
        //    //    return response;
        //    //}
        //},
        //responseError: function (response) {
        //    console.log('responseError:' + response);
        //    //if (response.status === 401) {
        //    //    authService.clear();
        //    //    window.location.href = "account.html#/login";
        //    //
        //    //}
        //    //else if (response.status == 403) {
        //    //    authService.clear();
        //    //    location.href = 'account.html#/login';
        //    //    return false;
        //    //}
        //    //else {
        //    //    return $q.reject(response);
        //    //}
        //
        //}

    };


});