(function(){
    "use strict";

    App.controller('TopNavbarController', ['$scope','$state','UserService','$http','$interval','successModalService',
        function($scope, $state, UserService, $http, $interval, successModalService) {

            $scope.currentUser= null;
            $scope.clicked = false;
            $scope.open = false;
            $scope.loggedIn = false;
            $scope.relevantNotifications = [];
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


            /*$interval(function () {
                if ($scope.user.firstName != null) {
                    $scope.user.status = true;
                }
            }, 7000);*/

            $scope.accept = function (convId) {
                console.log("conversationId:"+convId);
                $state.go('app.chat',{
                    id: convId
                });
            };

            $scope.decline = function (convId, notId) {
                console.log("conversationId:"+convId);
                $http.get('/api/conversations/remove/'+convId)
                    .then(function (res) {
                        console.log("Delete conversation " + res);
                        $http.get('/api/notifications/remove/'+notId)
                            .then(function (res) {
                                console.log("Result :", res);
                                var modalOptions = {
                                    actionButtonText: 'Continue',
                                    headerText: 'Conversation Declined'
                                };
                                successModalService.showModal({}, modalOptions);
                            })
                            .catch(function (err) {
                                console.log("Error removing the notification", err);
                            })

                    })
                    .catch(function (err) {
                        console.log("Error declining "+err);
                    })
            };


            /*$interval(function () {
                $http.get('/api/notifications/findByUser/'+$scope.currentUser._id)
                    .then(function (res) {
                        $scope.notifications = res.data;
                        console.log("notifications:" +res.data)
                    })
                    .catch(function (err) {
                        console.log("error " + err);
                    });
            }, 7000);*/

        }]);
})();