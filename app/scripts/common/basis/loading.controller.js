angular.module('vinciApp').controller('loadingCtrl', ($scope, $rootScope, $location, $cookies,profileService) => {

    $rootScope.notShowIndex = true;

    $rootScope.navType = 0;
    $rootScope.containerType = 0;
    $rootScope.footerType = 0;


    if(profileService.auth.did()){
        location.href = 'designer.html#/designer/project'
    }
    else if(profileService.auth.cid()){
        location.href = 'client.html#/client/project'
    }
    else{
        location.href = 'account.html#/login';
    }

});
