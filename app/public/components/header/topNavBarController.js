(function(){
    "use strict";

    App.controller('TopNavbarController', ['$scope','$state','UserService','ChatModalService',
        function($scope, $state, UserService, ChatModalService) {

            $scope.user= null;
            $scope.clicked = false;

            $scope.loggedIn = false;

            $scope.loginLink = function() {
                $state.go('login');
            };

            $scope.courses = function() {
                $state.go('app.courses');
            };


            $scope.getUser = function(){
                UserService.getCurrentUser()
                    .then(function (res) {
                        $scope.user = res.data.user;
                    }, function (err) {
                        console.log('Get user Error ' + err);
                        $scope.user = null;
                    })
            };
            $scope.getUser();

            $scope.userProfile = function(){
                $state.go('app.profile');
            };

            $scope.chatModal = function () {
                ChatModalService.showModal();
            }

        }]);
})();