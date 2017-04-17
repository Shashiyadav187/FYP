(function () {
    'use strict';
    App.controller('NotificationController', ['$scope','$http','UserService','$state',
        function ($scope, $http, UserService, $state){

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

            $scope.accept = function (convId) {
                console.log("conversationId:"+convId);
                $state.go('app.chat',{
                    id: convId
                });
            }
        }
    ])
})();