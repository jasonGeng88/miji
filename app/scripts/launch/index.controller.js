angular.module('launch').controller('indexCtrl', ($scope, $rootScope, $location, $cookies) => {

    $scope.login = () => {
        $location.path('/login');
    };

    $scope.register = () => {
        $location.path('/register');
    };


});

