(function(){
    'use strict';
    App.controller('ChatController',['$scope', 'UserService','$stateParams','$http','$interval','$timeout',
        function ($scope, UserService, $stateParams, $http, $interval, $timeout) {

            var id = $stateParams.id;
            console.log(id);

            /* $watch(function () {

             })*/
            $scope.conversation = {};
            $scope.revelvantConversations = [];
            $scope.friend = {};

            UserService.getCurrentUser()
                .then(function (res) {
                    $scope.currentUser = res.data.user;
                    console.log($scope.currentUser);
                }, function (err) {
                    console.log('Get user Error ' + err);
                    $scope.currentUser = null;
                });

            UserService.getUsers()
                .then(function (res) {
                    $scope.users = res.data;
                    console.log($scope.users+" users");
                }).catch(function (err) {
                console.log(err+" err");
            });

            $scope.getaUserById = function (id) {
                UserService.getById(id)
                    .then(function (res) {
                        $scope.friend = res.data;
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            };
            /*$scope.chatTo =function (user) {
             //console.log(user._id+" _id");
             $http.post('/api/notifications/',{
             senderId: $scope.currentUser._id,
             receiverId: user._id,
             timeStamp: Date.now(),
             message: $scope.currentUser.firstName+" "+
             $scope.currentUser.lastName+" has sent you a chat request",
             seen: false
             }).then(function (res) {
             console.log("Success "+res);
             }).catch(function (err) {
             console.log("Failed: "+err);
             });
             };*/

            /*  $scope.checkName = function (c) {
             if(c.user1Id == $scope.currentUser._id)   {
             $scope.conversation.user2Id
             console.log("1st if ");
             } else{
             $scope.getaUserById($scope.conversation.user1Id);
             console.log("2nd if");
             }
             };*/

            $scope.joinConversation =function (convId) {
                console.log(convId);
                $http.get('/api/conversations/'+convId)
                    .then(function (res) {
                        $scope.conversation = res.data;
                        console.log(res);
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            };

            $scope.chatTo = function (user) {
                $scope.friend = user;
                /*for(var i =0; i<$scope.conversations.length; i++) {
                 if (user._id == $scope.conversations[i].user1._id || user._id == $scope.conversations[i].user2._id)
                 /!*  $scope.friendConversations.push($scope.conversations[i]);*!/
                 }*/
                console.log("curr: "+$scope.currentUser.lastName," user2: "+user.lastName);
                $http.post('/api/conversations/', {
                    user1: $scope.currentUser,
                    user2: user,
                    timeStamp: Date.now()
                }).then(function (res) {
                    console.log("result: " + res.data);
                    $scope.conversation = res.data.data;
                    console.log($scope.conversation._id);
                    //console.log($scope.conversation.message)
                }).catch(function (err) {
                    console.log("err: " + err);
                    //$scope.conversation = null;
                });
                console.log($scope.conversation);
            };

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

            $http.get('/api/conversations/')
                .then(function (res) {
                    console.log(res.data);
                    console.log($scope.currentUser._id);
                    $scope.conversations = res.data;
                    for(var i =0; i<$scope.conversations.length; i++) {
                        if ($scope.currentUser._id == $scope.conversations[i].user1._id ||
                            $scope.currentUser._id == $scope.conversations[i].user2._id)
                            $scope.revelvantConversations.push($scope.conversations[i]);
                    }
                    console.log($scope.revelvantConversations);
                })
                .catch(function (err) {
                    console.log(err);
                });

            $scope.sendMessage = function() {
                $http.post('/api/messages/', {
                    body: $scope.body,
                    senderId: $scope.currentUser._id,
                    receiverId: $scope.friend._id,
                    read: false,
                    timeStamp: Date.now()
                }).then(function (res) {
                    $scope.message = res.data.data;
                    $http.post('/api/conversations/' + $scope.conversation._id, {
                        message: $scope.message
                    }).then(function (res) {
                        console.log("possibly nailed it1:" + res.data.data);
                    }).catch(function (err) {
                        console.log("error in catch in post to conv" + err);
                    });
                    console.log("res " + res.data);
                    $scope.body = " ";
                }).catch(function (err) {
                    console.log("err: " + err);
                });
            };

            /* $scope.checkName = function (c) {
             if (c.user1Id == $scope.currentUser._id) {
             console.log("user 2 id is friend");
             UserService.getById(c.user2Id)
             .then(function (res) {

             $scope.friendName.push(res.data.lastName);
             console.log($scope.friendName);
             })
             .catch(function (err) {
             console.log(err);
             })
             } else {
             console.log("user 1 id is friend");
             UserService.getById(c.user1Id)
             .then(function (res) {
             $scope.friendName.push(res.data.lastName);
             console.log($scope.friendName);
             })
             .catch(function (err) {
             console.log(err);
             })
             }
             };*/
        }])
})();