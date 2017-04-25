(function(){
    "use strict";

    App.controller('TopNavbarController', ['$scope','$state','UserService','$http','$interval','successModalService',
        function($scope, $state, UserService, $http, $interval, successModalService) {

            $scope.currentUser= null;
            $scope.clicked = false;
            $scope.open = false;
            $scope.loggedIn = false;
            $scope.relevantNotifications = [];

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
                        $scope.updateStatus();
                        $scope.updateConversationStatus();
                        $state.go('login');
                    })
                    .catch(function (err) {
                        console.log("Logout error: ", err);
                    })
            };

            $scope.updateStatus = function () {
                $http.post('/api/users/updateStatus/'+$scope.currentUser._id)
                    .then(function (res) {
                        console.log("status updated: "+res);
                    })
                    .catch(function (err) {
                        console.log("error updating: "+err);
                    })
            };

            /*$scope.updateConversationStatus = function () {
                $http.get('/api/conversations')
                    .then(function (res) {
                        console.log("status updated: "+res);
                        $scope.conversations = res.data;
                        for(var i = 0; i< $scope.conversations.length; i++){
                            $http.post('/api/conversations/updateStatus/'+$scope.conversations[i]._id+'/'+$scope.currentUser._id)
                                .then(function (res) {
                                    console.log("success "+ res);
                                })
                                .catch(function (err) {
                                    console.log("success "+ err);

                                })
                        }

                    })
                    .catch(function (err) {
                        console.log("error updating: "+err);
                    })
            };
*/
            $scope.accept = function (convId, notId) {
                console.log("conversationId:"+convId);
                console.log("notId:"+notId);
                $http.post('/api/notifications/updateSeen/'+notId)
                    .then(function (res) {
                        console.log("Notification changed to seen");
                        $scope.unseenNotifications.pop();
                    })
                    .catch(function (err) {
                        console.log("changing to seen error");
                    });
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

            $scope.unseenNotifications = [];

            /*$interval(function () {
                if ($scope.currentUser != null || $scope.currentUser != undefined) {
                    if($scope.currentUser.status == false){
                        $scope.updateStatus();
                        $scope.updateConversationStatus();
                    }
                    console.log("update status+ "+$scope.currentUser.status);
                    $http.get('/api/notifications/findByUser/'+$scope.currentUser._id)
                        .then(function (res) {
                            $scope.notifications = res.data;
                            for(var i= 0; i < $scope.notifications.length; i++) {
                                if ($scope.notifications[i].seen == false) {
                                    $scope.unseenNotifications.push($scope.notifications[i]);
                                }
                            }
                            console.log("notifications:" +res.data)
                        })
                        .catch(function (err) {
                            console.log("error " + err);
                        });
                }
            }, 7000);*/

        }]);
})();