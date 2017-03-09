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

                var modalOptions = {
                    closeButtonText:'Cancel',
                    actionButtonText: 'OK',
                    image: '',
                    course: c.title,
                    code: c.course_id,
                    college: c.college,
                    points: c.points,
                    sector: c.sector,
                    thesis: c.thesis,
                    portfolio: c.portfolio,
                    erasmus: c.erasmus,
                    placement: c.placement,
                    externalLink: c.externalLink,
                    duration: c.duration
                };

                courseModalService.showModal({}, modalOptions)
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