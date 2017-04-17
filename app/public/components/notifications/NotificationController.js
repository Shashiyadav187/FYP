(function () {
    'use strict';
    App.controller('NotificationController', ['$scope','$http','UserService','$state','successModalService',
        function ($scope, $http, UserService, $state, successModalService){

            $scope.relevantNotifications = [];

            UserService.getCurrentUser()
                .then(function (res) {
                    $scope.currentUser = res.data;
                })
                .catch(function (err) {
                    console.log("error in getting notifications");
                });

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

            /*$http.get('/api/notifications/getByUser/'+$scope.currentUser._id)
             .then(function (res) {
             $scope.relevantNotifications.push(res.data);
             console.log("convs: "+$scope.relevantNotifications)
             })
             .catch(function (err) {
             console.log("Error: "+err);
             });*/

            $scope.accept = function (convId) {
                console.log("conversationId:"+convId);
                $state.go('app.chat',{
                    id: convId
                });
            };
            $scope.decline = function (convId) {
                console.log("conversationId:"+convId);
                $http.get('/api/conversations/'+convId)
                    .then(function (res) {
                        console.log("Delete result " + res.data);
                        var modalOptions = {
                            actionButtonText: 'Continue',
                            headerText: 'Conversation Declined'
                        };

                        successModalService.showModal({}, modalOptions);
                    })
                    .catch(function (err) {
                        console.log("Error declining "+err);
                    })
            }
        }
    ])
})();