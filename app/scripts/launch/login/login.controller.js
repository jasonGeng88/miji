angular.module('launch').controller('loginCtrl', ($scope, $rootScope, APIService, statusConst, $location, $cookies) => {

    $scope.login = () => {
        APIService.user.login($scope.mobile, $scope.password).then((res) => {
            console.log('index - ', res);
            if(res.code == statusConst.success)
                alert("success");

        });
    }


});

