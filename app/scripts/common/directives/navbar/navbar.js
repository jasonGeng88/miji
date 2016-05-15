angular.module('vinciApp').directive('navbar', () => {
    return {
        restrict: 'E',
        scope: {
            type: '@type'
        },
        templateUrl: '/views/common/directives/navbar/navbar.html',
        replace: true,
        controller: ($scope, $rootScope, $http, $cookies, $location, $interval, APIService) => {
            $scope.state = {
                hasLogin: false,
            };

            if($scope.type == 1){
                $scope.state.hasLogin = false;
            }else if($scope.type == 2){
                $scope.state.hasLogin = true;
            }
        }
        //end controller
    };
    //end return

});
//end module
