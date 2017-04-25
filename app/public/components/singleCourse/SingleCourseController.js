(function(){
    'use strict';

    App.controller('SingleCourseController', [ '$scope', '$state','CourseService','$http','courseModalService','$stateParams','UserService','successModalService','$timeout',
        function($scope, $state, CourseService, $http, courseModalService, $stateParams,UserService,successModalService, $timeout){

            $scope.ditPhoto = false;
            $scope.ucdPhoto = false;
            $scope.tcdPhoto = false;
            $scope.textBody = "";

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
            },500);

            UserService.getCurrentUser()
                .then(function (res) {
                    $scope.currentUser = res.data.user;
                })
                .catch(function (err) {
                    console.log("Error: "+err);
                });


            $scope.addComment = function (body) {
                $http.post('/api/comments/',{
                    text : body,
                    user: $scope.currentUser,
                    course: $scope.course.course_id
                }).then(function (res) {
                    $scope.comment = res.data.comment;
                    $http.post('api/courses/addComment/'+ courseId,{
                        comments: $scope.comment
                    }).then(function (res) {
                        console.log("AddComment " , res);
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

            $scope.saveCourseToUser = function (c) {
                UserService.getCurrentUser()
                    .then(function (res) {
                        console.log("Get user success");
                        $scope.user = res.data.user;

                        $http.post('api/users/pushCourse/'+$scope.user.email,{
                            courses: c
                        }).success(function(data){
                            console.log("post to user success "+data);
                            var modalOptions = {
                                actionButtonText:'Continue',
                                headerText: c.title+' has been saved to your profile'
                            };

                            successModalService.showModal({}, modalOptions);
                        }).error(function (data, status) {
                            console.log("Error posting to user "+data);
                        })
                    }, function(err){
                        console.log("Get user error: "+err+ " status: "+status);
                    })
            }

        }])
})
();