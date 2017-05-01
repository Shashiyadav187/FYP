(function(){
    'use strict';
    App.controller('ChatController',['$scope', 'UserService','$stateParams','$http','$interval','successModalService',
        function ($scope, UserService, $stateParams, $http, $interval, successModalService) {

            var id = $stateParams.id;
            console.log("conversation Id "+id);

            $scope.conversation = {};
            $scope.relevantConversations = [];
            $scope.friend = {};
            $scope.noUser = true;
            $scope.activeChat = true;
            $scope.newChat = false;
            $scope.searchUser = "";

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

            $scope.sendInvitation =function (user) {
                $scope.friend = user;
                var loop = false;
                if($scope.relevantConversations.length > 0){
                    for (var i = 0; i < $scope.relevantConversations.length; i++) {
                        if (user.email == $scope.relevantConversations[i].user1.email || user.email == $scope.relevantConversations[i].user2.email) {
                            $scope.joinConversation($scope.relevantConversations[i]._id);
                            $scope.activeChat();
                            loop = false;
                            break;
                        } else {
                            loop = true;
                        }
                    }
                }else {
                    $http.post('/api/conversations/', {
                        user1: $scope.currentUser,
                        user2: user,
                        timeStamp: Date.now()
                    }).then(function (res) {
                        console.log("result conv: " + res.data.data.conversation);
                        console.log("result: " + res.data.data);
                        $scope.conversation = res.data.data;
                        console.log("Post Conversation: " + $scope.conversation);
                        $http.post('/api/notifications/', {
                            senderId: $scope.currentUser._id,
                            receiverId: user._id,
                            conversationId: $scope.conversation._id,
                            timeStamp: Date.now(),
                            message: $scope.currentUser.firstName + " " +
                            $scope.currentUser.lastName + " has sent you a chat request",
                            seen: false
                        }).then(function (res) {
                            console.log("Success " + res);
                            var modalOptions = {
                                actionButtonText: 'Continue',
                                headerText: 'Chat Invitation Sent to ' + user.firstName
                            };
                            successModalService.showModal({}, modalOptions);
                        }).catch(function (err) {
                            console.log("Failed: " + err);
                        });
                        console.log($scope.conversation._id);
                    }).catch(function (err) {
                        console.log("err: " + err);
                        //$scope.conversation = null;
                    });
                }
                if(loop) {
                    $http.post('/api/conversations/', {
                        user1: $scope.currentUser,
                        user2: user,
                        timeStamp: Date.now()
                    }).then(function (res) {
                        console.log("result: " + res.data.data);
                        $scope.conversation = res.data.data;
                        console.log("Post Conversation: " + $scope.conversation);
                        $http.post('/api/notifications/', {
                            senderId: $scope.currentUser._id,
                            receiverId: user._id,
                            conversationId: $scope.conversation._id,
                            timeStamp: Date.now(),
                            message: $scope.currentUser.firstName + " " +
                            $scope.currentUser.lastName + " has sent you a chat request",
                            seen: false
                        }).then(function (res) {
                            console.log("Success " + res);
                            var modalOptions = {
                                actionButtonText: 'Continue',
                                headerText: 'Chat Invitation Sent to ' + user.firstName
                            };
                            successModalService.showModal({}, modalOptions);
                        }).catch(function (err) {
                            console.log("Failed: " + err);
                        });
                        console.log($scope.conversation._id);
                    }).catch(function (err) {
                        console.log("err: " + err);
                        //$scope.conversation = null;
                    });
                }
            };

            $scope.joinConversation =function (convId) {
                if(convId == null || convId == "" || convId == undefined){
                    $scope.noUser = true;
                }else {
                    $scope.noUser = false;
                    console.log(convId);
                    $http.get('/api/conversations/' + convId)
                        .then(function (res) {
                            $scope.conversation = res.data;
                            console.log(res.data);
                            if ($scope.currentUser._id == $scope.conversation.user1._id) {
                                $scope.friend = $scope.conversation.user2;
                            } else {
                                $scope.friend = $scope.conversation.user1;
                            }
                            console.log(res);
                        })
                        .catch(function (err) {
                            console.log(err);
                        })
                }
            };


            if(id != null) {
                console.log("Inside if statement with id: "+id);
                $scope.joinConversation(id);
            }

            /*$scope.chatTo = function (user) {
                $scope.friend = user;
                var loop = false;
                if($scope.relevantConversations.length > 0){
                    for (var i = 0; i < $scope.relevantConversations.length; i++) {
                        if (user._id == $scope.relevantConversations[i].user1._id || user._id == $scope.relevantConversations[i].user2._id) {
                            $scope.conversation = $scope.relevantConversations[i];
                            loop = false;
                            break;
                        } else {
                            loop = true;
                        }
                    }
                }else{
                    console.log("curr: " + $scope.currentUser.lastName, " user2: " + user.lastName);
                    $http.post('/api/conversations/', {
                        user1: $scope.currentUser,
                        user2: user,
                        timeStamp: Date.now()
                    }).then(function (res) {
                        console.log("result: " + res.data.data);
                        $scope.conversation = res.data.data;
                        console.log($scope.conversation._id);
                    }).catch(function (err) {
                        console.log("err: " + err);
                        //$scope.conversation = null;
                    });
                }
                if(loop) {
                    console.log("curr: " + $scope.currentUser.lastName, " user2: " + user.lastName);
                    $http.post('/api/conversations/', {
                        user1: $scope.currentUser,
                        user2: user,
                        timeStamp: Date.now()
                    }).then(function (res) {
                        console.log("result: " + res.data.data);
                        $scope.conversation = res.data.data;
                        console.log($scope.conversation._id);
                    }).catch(function (err) {
                        console.log("err: " + err);
                        //$scope.conversation = null;
                    });
                    console.log($scope.conversation);
                }
            };*/

            if($scope.noUser){
                $scope.disabled = true;
                $scope.conversation = {

                }
            }

            /*$interval(function () {
                console.log($scope.conversation._id);
                $http.get('/api/conversations/'+$scope.conversation._id)
                    .then(function (res) {
                        $scope.conversation = res.data;
                        console.log("res.data in get: "+res.data);
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            }, 5000);*/

            $http.get('/api/conversations/')
                .then(function (res) {
                    console.log(res.data);
                    console.log($scope.currentUser._id);
                    $scope.conversations = res.data;
                    for(var i =0; i<$scope.conversations.length; i++) {
                        if ($scope.currentUser._id == $scope.conversations[i].user1._id){
                            //$scope.conversations[i].user1.status = true;
                            $scope.relevantConversations.push($scope.conversations[i]);
                        }else if($scope.currentUser._id == $scope.conversations[i].user2._id) {
                            //$scope.conversations[i].user2.status = true;
                            $scope.relevantConversations.push($scope.conversations[i]);
                        }
                    }

                    console.log($scope.relevantConversations);
                })
                .catch(function (err) {
                    console.log(err);
                });

            $scope.sendMessage = function() {
                console.log("friend :", $scope.friend, " currentUser: ", $scope.currentUser);
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

            $scope.activeChats = function () {
                $scope.activeChat = true;
                $scope.newChat = false;
            };

            $scope.newChats = function () {
                $scope.activeChat = false;
                $scope.newChat  =true;
            }
        }])
        .filter('userFilter', function() {
            return function(users, search) {
                if (angular.isDefined(search)) {
                    var filtered = [];
                    angular.forEach(users, function (user) {
                        if (user.firstName.toLowerCase().includes(search) || user.firstName.includes(search)) {
                            filtered.push(user);
                        } else if(search == ''){
                            filtered.push(user);
                        } else if(user.lastName.toLowerCase().includes(search) || user.lastName.includes(search)){
                            filtered.push(user);
                        }
                    });
                    return filtered;
                }
            };
        })

})();