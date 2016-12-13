(function(){
    "use strict";

    App.controller('homeController', ['$scope','$state','$http',
        function($scope, $state, $http) {

            $scope.welcome = "Hello and Welcome To The College Experience";

           /* $scope.tests = null;*/

            $scope.loginLink = function() {
                $state.go('login');
            };

            $scope.testMenu = function() {
                $state.go('app.testMenu');
            };
/*
            $scope.getTest = function () {
                $http({
                    method: 'GET',
                    url: '/api/tests/'
                }).then(function successCallback(response) {
                    console.log("Success");
                    console.log(response);
                    $scope.tests = response.data;
                    console.log($scope.tests);
                }, function errorCallback(response) {
                    console.log("Error");
                    console.log(response);
                    $scope.tests = null;
                });
            };
            $scope.getTest();
            */
        }]);
})();