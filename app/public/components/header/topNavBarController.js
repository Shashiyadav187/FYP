(function(){
    "use strict";

    App.controller('TopNavbarController', ['$scope','$state','UserService','ChatModalService','$http','$timeout','$interval','$rootScope',
        function($scope, $state, UserService, ChatModalService, $http, $interval,$rootScope) {

            $scope.currentUser= null;
            $scope.clicked = false;
            $scope.open = false;
            $scope.loggedIn = false;
            $scope.relevantNotifications = [];
            var userFound = false;
            //console.log("current user here:" ,$rootScope.currentUser);

            $scope.loginLink = function() {
                $state.go('login');
            };

            $scope.courses = function() {
                $state.go('app.courses');
            };


            $scope.getUser = function(){
                UserService.getCurrentUser()
                    .then(function (res) {
                        $scope.currentUser = res.data.user;
                        userFound = true;
                    }, function (err) {
                        console.log('Get user Error ' + err);
                        $scope.currentUser = null;
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

            $scope.logout = function () {
                $scope.currentUser.status = false;
                $http.get('/api/users/logout')
                    .then(function (res) {
                        console.log("Success logout",res);
                        $state.go('login');
                    })
                    .catch(function (err) {
                        console.log("Logout error: ", err);
                    })
            };



            /*$scope.chatDropdown = function () {
                angular.element(document.getElementById("myDropdown").classList.toggle("show"));
            };*/

            /*$interval(function () {
                if ($scope.user.firstName != null) {
                    $scope.user.status = true;
                }
            }, 7000);*/
            $interval(function () {
                $http.get('/api/notifications')
                    .then(function (res) {
                        $scope.allNotifications = res.data;
                        for(var i = 0; i< $scope.allNotifications.length; i++){
                            if($scope.currentUser._id == $scope.allNotifications[i].receiverId)
                                $scope.relevantNotifications.push($scope.allNotifications[i])
                        }
                        console.log("notifications:" +res.data)
                    })
                    .catch(function (err) {
                        console.log("error " + err);
                    });
            }, 7000);

        }]);
})();