(function(){
    'use strict';

    App.controller('DefinedCoursesController', [ '$scope', '$state','CourseService','$http','courseModalService','$stateParams','UserService','successModalService',
        function($scope, $state, CourseService, $http, courseModalService, $stateParams,UserService,successModalService){

            $scope.courses = null;
            $scope.min = 0;
            $scope.max = 0;
            $scope.ditPhoto = false;
            $scope.ucdPhoto = false;
            $scope.tcdPhoto = false;
            $scope.openPoints = false;
            $scope.openColleges = false;
            $scope.openSectors = false;

            $scope.sectorName = JSON.parse($stateParams.sectorName);
            console.log(name + " give it to me here");

            $scope.getCourses = function(){
                CourseService.getCourses()
                    .then(function (res) {
                        $scope.courses = res.data;
                        //getCoursesBySector($scope.coursess);
                    }, function (err) {
                        console.log('Error ' + err);
                        $scope.courses = null;
                    })
            };
            $scope.getCourses();

            $scope.collegeFunction = function () {
                angular.element(document.querySelector('#collegeDropdown').classList.toggle('show'));
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

            $scope.types = {UCD: false, TCD:false, DIT:false};
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