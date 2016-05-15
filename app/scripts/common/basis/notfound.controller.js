angular.module('vinciApp').controller('notfoundCtrl', ($scope, $rootScope, $http, $location, $cookies, profileService,gaService) => {


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
});

angular.module('vinciApp').controller('norAuthCtrl', ($scope, $rootScope, $http, $location, $cookies, profileService,gaService) => {


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
});