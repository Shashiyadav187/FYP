(function(){
    "use strict";

    App.controller('homeController', ['$scope','$state','$http',
        function($scope, $state, $http) {

            $scope.welcome = "Hello and Welcome To The College Experience";

            $scope.loginLink = function() {
                $state.go('login');
            };

            $scope.testMenu = function() {
                $state.go('app.testMenu');
            };

            $scope.images = [
                './assets/img/laptop.in.use.png',

            ];
        }]);
})();