(function(){
    "use strict";

    App.controller('TopNavbarController', ['$scope','$state',
        function($scope, $state) {

            $scope.loginLink = function() {
                $state.go('login');
            };
        }]);
})();