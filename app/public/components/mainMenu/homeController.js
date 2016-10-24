(function(){
    "use strict";

    App.controller('homeController', ['$scope','$state',
        function($scope, $state) {

            $scope.welcome = "Hello and Welcome To The College Experience";

            $scope.loginLink = function() {
                $state.go('login');
            };
        }]);
})();