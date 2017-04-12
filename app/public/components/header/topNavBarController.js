(function(){
    "use strict";

    App.controller('TopNavbarController', ['$scope','$state','UserService','ChatModalService','$http','$timeout','$interval',
        function($scope, $state, UserService, ChatModalService, $http, $interval) {

            $scope.user= null;
            $scope.clicked = false;
            $scope.open = false;
            $scope.loggedIn = false;
            var userFound = false;

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
                        userFound = true;
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
                //ChatModalService.showModal();
                $state.go('app.chat');
            };

            /*$interval(function () {
            while(userFound) {
                $http.get('api/notifications/' + $scope.user._id)
                    .then(function (res) {
                        console.log(res);
                        $scope.notification = res.data;
                    })
                    .catch(function (err) {
                        console.log("no notifications");
                    })
            }
            }, 8000)*/

        }]);
})();