angular.module('vinciApp').controller('errorCtrl', ($scope, $rootScope, $http, $location, $cookies, profileService,gaService) => {

    $rootScope.notShowIndex = true;


    $rootScope.navType = 5;
    if (profileService.auth.did()) {
        $rootScope.navType = 3;
    }
    if (profileService.auth.cid()) {
        $rootScope.navType = 4;
    }
    $rootScope.containerType = 4;
    $rootScope.footerType = 1;

    $scope.initial = () => {
        gaService.do();
    };


    // $scope.inputemail = function(){
    //     $scope.error = '';
    //     $scope.gotoError = '';
    // }
    // var wHeight=window.screen.availHeight;
    // console.log(wHeight);
    // var cHeight=document.getElementsByClassName('container-inner')[0].offsetHeight;
    // if (wHeight > cHeight ) {
    //     var movetop=(wHeight-cHeight-60-55-23)/2;
    //     $scope.movetop=movetop;
    //     console.log(movetop);
    // };
    // $rootScope.navType=1;
    // $rootScope.containerType = 1;



});
