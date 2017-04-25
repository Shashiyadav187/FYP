(function(){
    'use strict';

    App.controller('CoursesController', [ '$scope', '$state','CourseService','$http','courseModalService','$timeout','UserService','successModalService',
        function($scope, $state, CourseService, $http, courseModalService, $timeout, UserService,successModalService){

            $scope.courses = null;
            $scope.min = 0;
            $scope.max = 0;
            $scope.ditPhoto = false;
            $scope.ucdPhoto = false;
            $scope.tcdPhoto = false;
            $scope.openPoints = false;
            $scope.openColleges = false;
            $scope.openSectors = false;
            $scope.arrayCourses = [];
            $scope.hasSaved = false;

            $scope.currUser = function () {
                UserService.getCurrentUser()
                    .then(function (res) {
                        console.log("Get user success");
                        $scope.user = res.data.user;
                    })
                    .catch(function (err, status) {
                        console.log("Get user error: " + err + " status: " + status);
                    });
            };
            $scope.currUser();

            $scope.getCourses = function(){
                CourseService.getCourses()
                    .then(function (res) {
                        $scope.courses = res.data;
                        //$scope.removeUnnecessaryCourses();
                        //console.log("data is "+ res.data);
                    }, function (err) {
                        console.log('Error ' + err);
                        $scope.course = null;
                    })
            };
            $scope.getCourses();

           /* var shitCourses = [];
            $scope.removeUnnecessaryCourses = function () {
                for(var i = 0; i < $scope.courses.length; i++){
                    switch($scope.courses[i].sector){
                        case 'Sociology and Social Care':
                            shitCourses.push($scope.courses[i]);
                            removeCourseById($scope.courses[i]._id);
                            break;
                        case 'Psychology and Law':
                            shitCourses.push($scope.courses[i]);
                            removeCourseById($scope.courses[i]._id);
                            break;
                        case 'History and Politics':
                            shitCourses.push($scope.courses[i]);
                            removeCourseById($scope.courses[i]._id);
                            break;

                    }
                } console.log("shit courses: "+ shitCourses);
            };*/

            /*var removeCourseById = function (cid) {
                $http.get('/api/courses/remove/'+cid)
                    .then(function (res) {
                        console.log("course removed: "+res);
                    })
                    .catch(function (err) {
                        console.log("error removing course: ",err);
                    })
            };*/

            $scope.createCourses = function(coursesArray){
                console.log("clicked");
                console.log(coursesArray.courses.length);
                for(var i = 0; i<coursesArray.courses.length; i++){
                    if(coursesArray.courses[i].institution.title == "University College Dublin" ||
                        coursesArray.courses[i].institution.title == "Trinity College" ||
                        coursesArray.courses[i].institution.title == "Dublin Institute of Technology"){

                        if(coursesArray.courses[i].topics.main_topic != "Sociology and Social Care" ||
                            coursesArray.courses[i].topics.main_topic != "Psychology and Law" ||
                            coursesArray.courses[i].topics.main_topic != "History and Politics"){

                            if(coursesArray.courses[i].points != null && coursesArray.courses[i].points != ""
                                &&  coursesArray.courses[i].points != "#+matric") {

                                $http.post('/api/courses', {
                                    title: coursesArray.courses[i].title,
                                    course_id: coursesArray.courses[i].course_id,
                                    duration: coursesArray.courses[i].duration,
                                    college: coursesArray.courses[i].institution.title,
                                    points: coursesArray.courses[i].points,
                                    sector: coursesArray.courses[i].topics.main_topic,
                                    quickSearch: coursesArray.courses[i].search_aid
                                })
                                    .success(function (data, status, header, config) {
                                        if (data.success) {
                                            console.log(data);
                                        } else {
                                            console.log("Success :)");
                                        }
                                    });
                            } else {
                                console.log("has no points");
                            }
                        } else {
                            console.log("Not found sector error");
                        }
                    } else {
                        console.log("Not found college error");
                    }}};

            $scope.collegeFunction = function () {
                angular.element(document.querySelector('#collegeDropdown').classList.toggle('show'));
            };
            $scope.mySectorFunction = function () {
                angular.element(document.querySelector('#sectorDropdown').classList.toggle('show'));

            };
            $scope.myPointsFunction = function () {
                angular.element(document.querySelector('#pointsDropdown').classList.toggle('show'));
            };


            $scope.ageFilter = function(course){
                return(course.points[0] >= $scope.min_points && course.points[0] <= $scope.max_points);
            };

            $scope.clearAll = function(){
                $scope.types = {UCD: false, TCD:false, DIT:false};
                $scope.searches = {cs:false, ec:false, ms:false, bm:false, ea:false};
                $scope.min_points = 0;
                $scope.max_points = 775;
                $scope.searchBar = "";
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

                $scope.myFunction = function (course) {
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

            $scope.types = {UCD: false, TCD:false, DIT:false};
            $scope.searches = {cs:false, ec:false, ms:false, bm:false, ea:false};
            $scope.min_points = 0;
            $scope.max_points = 775;

            $scope.displayCourse = function (c) {
                $http.post('/api/courses/updateCounter/' + c._id)
                    .then(function (res) {
                        console.log("Update counter "+ res);
                        $scope.getCourses();
                    })
                    .catch(function (err) {
                        console.log("error counting");
                    });

                $http.post('/api/users/updateViewed/'+$scope.user._id,{
                    recentlyViewed: c
                }).then(function (res) {
                        console.log("Added Recently Viewed"+ c.title);
                        console.log("Res "+ res.data);
                    })
                    .catch(function (err) {
                        console.log("error updating user "+ err);
                    });

                $scope.getCourses();
                $scope.currUser();

                $state.go('app.singleCourse',{
                    id : JSON.stringify(c._id)
                });
            };


            /*
             $scope.getMoreDetailedCourse = function (ca) {


             var id = null;
             for(var i = 165; i < 220; i++){
             id = ca[i].course_id;

             CourseService.getCourse(id)
             .then(function (res) {
             $scope.definedCourses = res.data;
             $scope.arrayCourses.push($scope.definedCourses);
             console.log($scope.arrayCourses);
             }, function (err) {
             console.log(err + "error here");
             })
             }

             function addToCourse(courses){
             for(var t = 0; t<courses.length; t++){
             /!*

             console.log(courses[t].courses[0].course_id);
             console.log(JSON.parse(courses[t].courses[0].course_id));
             *!/
             if(courses[t].courses[0].points_history.length<=1){
             $http.post('/api/courses/pushCourse/'+ courses[t].courses[0].course_id, {
             externalLink: courses[t].courses[0].external_link.external_link,
             erasmus: courses[t].courses[0].has_erasmus,
             placement: courses[t].courses[0].has_placement,
             portfolio: courses[t].courses[0].has_portfolio,
             thesis: courses[t].courses[0].has_thesis,
             points: [courses[t].courses[0].points_history[0].points]
             })
             .success(function(data, status, header, config){
             if(data.success){
             //console.log(data);
             console.log("Failure possibly");
             } else {
             console.log("Success---------- Possibly"+data);
             $state.go('app.home');
             }

             });
             } else {
             $http.post('/api/courses/pushCourse/' + courses[t].courses[0].course_id, {
             externalLink: courses[t].courses[0].external_link.external_link,
             erasmus: courses[t].courses[0].has_erasmus,
             placement: courses[t].courses[0].has_placement,
             portfolio: courses[t].courses[0].has_portfolio,
             thesis: courses[t].courses[0].has_thesis,
             points: [courses[t].courses[0].points_history[0].points, courses[t].courses[0].points_history[1].points]
             })
             .success(function (data, status, header, config) {
             if (data.success) {
             //console.log(data);
             console.log("Failure possibly");
             } else {
             console.log("Success---------- Possibly" + data);
             $state.go('app.home');
             }

             });
             }
             }
             }
             $timeout( function(){
             addToCourse($scope.arrayCourses)},
             5000);

             };
             */


            $scope.saveCourseToUser = function (c) {
                var breakout= false;
                if($scope.user.courses.length > 0 ){
                    for(var i =0; i<$scope.user.courses.length; i++) {
                        if ($scope.user.courses[i].title === c.title) {
                            var modalOptions = {
                                actionButtonText: 'Continue',
                                headerText: c.title + ' has already been saved',
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
                    $http.post('api/users/pushCourse/' + $scope.user.email, {
                        courses: c
                    }).then(function (res) {
                        console.log("post to user success " + res);
                        $scope.currUser();
                        var modalOptions = {
                            actionButtonText: 'Continue',
                            headerText: c.title + ' has been saved',
                            bodyText: 'Go to your profile page to view your saved courses'
                        };

                        successModalService.showModal({}, modalOptions);
                    }).catch(function (data, status) {
                        console.log("Error posting to user " + data + " status: " + status);
                    })
                }
                if(breakout)
                    $http.post('api/users/pushCourse/' + $scope.user.email, {
                        courses: c
                    }).then(function (res) {
                        console.log("post to user success " + res);
                        $scope.currUser();
                        var modalOptions = {
                            actionButtonText: 'Continue',
                            headerText: c.title + ' has been saved',
                            bodyText: 'Go to your profile page to view your saved courses'
                        };


                        successModalService.showModal({}, modalOptions);

                    }).catch(function (data, status) {
                        console.log("Error posting to user " + data + " status: " + status);
                    });

            }

        }])
        .filter('customFilter', function() {
            return function(courses, types) {
                if (angular.isDefined(types)) {
                    var filtered = [];
                    angular.forEach(courses, function (course) {
                        if (types.UCD == false && types.TCD == false && types.DIT == false) {
                            filtered.push(course);
                        } else if (types.UCD == true && course.quickSearch.includes('UCD')) {
                            filtered.push(course);
                        } else if (types.DIT == true && course.quickSearch.includes('DIT')) {
                            filtered.push(course);
                        } else if (types.TCD == true && course.quickSearch.includes('TCD')) {
                            filtered.push(course);
                        }
                    });
                    return filtered;
                }
            };
        })
        .filter('sectorFilter', function(){
            return function(courses, searches){
                if(angular.isDefined(searches)){
                    var results = [];
                    angular.forEach(courses, function(course){
                        if(searches.cs == false && searches.ec == false && searches.ms == false
                            && searches.bm == false && searches.ea == false){
                            results.push(course);
                        }else if (searches.cs == true && course.sector == "Computer Science") {
                            results.push(course);
                        }else if (searches.ec == true && course.sector == "Engineering and Construction") {
                            results.push(course);
                        }else if (searches.ms == true && course.sector == "Medicine and Science") {
                            results.push(course);
                        }else if (searches.bm == true && course.sector == "Business and Management") {
                            results.push(course);
                        }else if (searches.ea == true && course.sector == "Education and Arts") {
                            results.push(course);
                        }
                    });
                    return results;
                }
            }
        });

})
();