(function(){
    "use strict";

    App.controller('LoginController', ['$scope','$state',
        function($scope, $state) {

            $scope.images = [
                './assets/img/1.jpg',
                './assets/img/2.jpg',
                './assets/img/3.jpg'
            ];

            $scope.signup = function(){
                $state.go('signup');
            }

        }]);
})();