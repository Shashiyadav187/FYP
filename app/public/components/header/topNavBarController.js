(function(){
    "use strict";

    App.controller('TopNavbarController', ['$scope','$state',
        function($scope, $state) {

            
            $scope.something="say something";
            
            $scope.loginLink = function() {
                $state.go('login');
            };
        }]);
})();