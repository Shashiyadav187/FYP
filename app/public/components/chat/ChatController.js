(function(){
    'use strict';
    App.controller('ChatController',['$scope', 'UserService','$stateParams','$http','$interval','$timeout',
        function ($scope, UserService, $stateParams, $http, $interval, $timeout) {

            var id = $stateParams.id;
            console.log(id);

           /* $watch(function () {

            })*/
            $scope.conversation = {};

            UserService.getCurrentUser()
                .then(function (res) {
                    $scope.currentUser = res.data.user;
                    //console.log($scope.currentUser);
                    console.log("_id: "+$scope.currentUser._id);
                }, function (err) {
                    console.log('Get user Error ' + err);
                    $scope.currentUser = null;
                });


            UserService.getById($stateParams.id)
                .then(function (res) {
                    $scope.friend = res.data;
                    console.log($scope.friend+" friend");
                }).catch(function (err) {
                console.log(err+" err");
                $scope.friend = null;
            });

            $timeout(function () {
                $http.post('/api/conversations/',{
                    user1Id: $scope.currentUser._id,
                    user2Id: id,
                    timeStamp: Date.now()
                }).then(function (res) {
                    console.log("result: "+ res.data);
                    $scope.conversation = res.data.data;
                    console.log($scope.conversation._id);
                    //console.log($scope.conversation.message)
                }).catch(function (err) {
                    console.log("err: "+err);
                    $scope.conversation = null;
                });
            }, 500);

            $interval(function () {
                console.log($scope.conversation._id);
                $http.get('/api/conversations/'+$scope.conversation._id)
                    .then(function (res) {
                        $scope.conversation = res.data;
                        console.log("res.data in get: "+res.data);
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            }, 5000);


            $scope.sendMessage = function(){
                $http.post('/api/messages/',{
                    body: $scope.body,
                    senderId: $scope.currentUser._id,
                    receiverId: id,
                    read: false,
                    timeStamp: Date.now()
                }).then(function (res) {
                    $scope.message = res.data.data;
                    $http.post('/api/conversations/'+$scope.conversation._id,{
                        message: $scope.message
                    }).then(function (res) {
                        console.log("possibly nailed it1:" + res.data.data);
                    }).catch(function (err) {
                        console.log("error in catch in post to conv"+err);
                    });
                    console.log("res "+res.data)
                }).catch(function (err) {
                    console.log("err: "+ err);
                })
            };
        }])
})();