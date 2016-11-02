(function(){
    "use strict";

    App.controller('TopNavbarController', ['$scope','$state','$http',
        function($scope, $state, $http) {

            $scope.user= null;

            $scope.loggedIn = false;
            
            $scope.loginLink = function() {
                $state.go('login');
            };

            $scope.getUser = function () {
                $http({
                    method: 'GET',
                    url: '/api/users/current'
                }).then(function successCallback(response) {
                    console.log("Success");
                    console.log(response);
                    $scope.loggedIn = true;
                    $scope.user = response.data.user;
                }, function errorCallback(response) {
                    console.log("Error");
                    console.log(response);
                    $scope.user = null;
                });
                return $scope.loggedIn = true;
            };
            $scope.getUser();

        }]);
})();