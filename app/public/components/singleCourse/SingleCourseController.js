(function(){
    'use strict';

    App.controller('SingleCourseController', [ '$scope', '$state','CourseService','$http','courseModalService','$stateParams','UserService','successModalService','$timeout',
        function($scope, $state, CourseService, $http, courseModalService, $stateParams,UserService,successModalService, $timeout) {

            $scope.ditPhoto = false;
            $scope.ucdPhoto = false;
            $scope.tcdPhoto = false;
            $scope.textBody = "";
            $scope.year = 2017;
            $scope.conversations = [];
            $scope.relevantConversations = [];
            $scope.friend = {};

            var courseId = JSON.parse($stateParams.id);
            console.log(courseId + " course id here");

            $timeout(function () {
                CourseService.getCourse(courseId)
                    .then(function (res) {
                        $scope.course = res.data;
                        console.log($scope.course);
                    }, function (err) {
                        console.log('Error ' + err);
                        $scope.courses = null;
                    });
            }, 500);
            $scope.getCurrentCourse = function () {
                CourseService.getCourse(courseId)
                    .then(function (res) {
                        $scope.course = res.data;
                        console.log($scope.course);
                    }, function (err) {
                        console.log('Error ' + err);
                        $scope.courses = null;
                    });
            };

            $scope.currUser = function () {
                UserService.getCurrentUser()
                    .then(function (res) {
                        $scope.currentUser = res.data.user;
                    })
                    .catch(function (err) {
                        console.log("Error: " + err);
                    });
            };

            $scope.currUser();

            $scope.addComment = function (body) {
                $http.post('/api/comments/',{
                    text : body,
                    user: $scope.currentUser,
                    course: $scope.course.course_id
                }).then(function (res) {
                    $scope.comment = res.data.comment;
                    console.log("comment: "+$scope.comment);
                    $http.post('/api/courses/addComment/'+ courseId,{
                        comments: $scope.comment
                    }).then(function (res) {
                        console.log("AddComment " , res);
                        $scope.getCurrentCourse();
                    })
                        .catch(function (err) {
                            console.log("Error ", err);
                        })
                })
                    .catch(function (err) {
                        console.log("Error: "+err);
                    });

            };

            $scope.collegeCourse = function(courses){
                $scope.collegePhoto = null;
                angular.forEach(courses, function (course) {
                    if(course.college == "University College Dublin"){
                        $scope.collegePhoto = "UCD";
                    }else if(course.college == "Trinity College"){
                        $scope.collegePhoto = "TCD";
                    }else if(courses.college == "Dublin Institute of Technology"){
                        $scope.collegePhoto = "DIT";
                    } else{
                        $scope.collegePhoto= "didnt work";
                    }
                });

                $scope.myFunction = function (course, i) {
                    if(course.college == "University College Dublin"){
                        $scope.collegePhoto = "UCD";
                    }else if(course.college == "Trinity College"){
                        $scope.collegePhoto = "TCD";
                    }else if(courses.college == "Dublin Institute of Technology"){
                        $scope.collegePhoto = "DIT";
                    } else{
                        $scope.collegePhoto= "didnt work";
                    }
                };
            };

            $scope.saveCourseToUser = function () {
                var breakout= false;
                if($scope.currentUser.courses.length > 0 ){
                    for(var i =0; i<$scope.currentUser.courses.length; i++) {
                        if ($scope.currentUser.courses[i].title === $scope.course.title) {
                            var modalOptions = {
                                actionButtonText: 'Continue',
                                headerText: $scope.course.title + ' has already been saved',
                                bodyText: 'Go to your profile page to view your saved courses'
                            };

                            successModalService.showModal({}, modalOptions);
                            breakout = false;
                            break;
                        } else {
                            breakout = true;
                        }
                    }
                }else{
                    $http.post('api/users/pushCourse/' + $scope.currentUser.email, {
                        courses: $scope.course
                    }).then(function (res) {
                        console.log("post to user success " + res);
                        $scope.currUser();
                        var modalOptions = {
                            actionButtonText: 'Continue',
                            headerText: $scope.course.title + ' has been saved',
                            bodyText: 'Go to your profile page to view your saved courses'
                        };

                        successModalService.showModal({}, modalOptions);
                    }).catch(function (data, status) {
                        console.log("Error posting to user " + data + " status: " + status);
                    })
                }
                if(breakout)
                    $http.post('api/users/pushCourse/' + $scope.currentUser.email, {
                        courses: $scope.course
                    }).then(function (res) {
                        console.log("post to user success " + res);
                        $scope.currUser();
                        var modalOptions = {
                            actionButtonText: 'Continue',
                            headerText: $scope.course.title + ' has been saved',
                            bodyText: 'Go to your profile page to view your saved courses'
                        };


                        successModalService.showModal({}, modalOptions);

                    }).catch(function (data, status) {
                        console.log("Error posting to user " + data + " status: " + status);
                    });
            };

            /*$scope.saveCourseToUser = function () {
             UserService.getCurrentUser()
             .then(function (res) {
             console.log("Get user success");
             $scope.user = res.data.user;

             $http.post('api/users/pushCourse/'+$scope.user.email,{
             courses: $scope.course
             }).success(function(data){
             console.log("post to user success "+data);
             var modalOptions = {
             actionButtonText:'Continue',
             headerText: $scope.course.title+' has been saved to your profile'
             };

             successModalService.showModal({}, modalOptions);
             }).error(function (data, status) {
             console.log("Error posting to user "+data);
             })
             }, function(err){
             console.log("Get user error: "+err+ " status: "+status);
             })
             };*/

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

            $scope.sendInvitation =function (user) {
                $scope.friend = user;
                var loop = false;
                if($scope.relevantConversations.length > 0){
                    for (var i = 0; i < $scope.relevantConversations.length; i++) {
                        if (user.email == $scope.relevantConversations[i].user1.email || user.email == $scope.relevantConversations[i].user2.email) {
                            $state.go('app.chat',{
                                id: $scope.relevantConversations[i]._id
                            });
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

        }])
})
();