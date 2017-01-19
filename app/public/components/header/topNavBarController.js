(function(){
    "use strict";

    App.controller('TopNavbarController', ['$scope','$state','UserService',
        function($scope, $state, UserService) {

            $scope.user= null;

            $scope.loggedIn = false;
            
            $scope.loginLink = function() {
                $state.go('login');
            };

            $scope.getUser = function(){
                UserService.getCurrentUser()
                    .then(function (res) {
                        console.log("Success----------------");
                        $scope.user = res.data.user;
                    }, function (err) {
                        console.log('Get user Error ' + err);
                        $scope.user = null;
                    })
            };
            $scope.getUser();

            $scope.userProfile = function(){
                $state.go('app.profile');
            }

        }]);
})();