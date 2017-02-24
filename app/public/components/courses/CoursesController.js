(function(){
    'use strict';

    App.controller('CoursesController', [ '$scope', '$state','CourseService','$http','courseModalService','$timeout',
        function($scope, $state, CourseService, $http, courseModalService, $timeout){

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


            $scope.getCourses = function(){
                CourseService.getCourses()
                    .then(function (res) {
                        $scope.courses = res.data;
                        //console.log("data is "+ res.data);
                    }, function (err) {
                        console.log('Error ' + err);
                        $scope.course = null;
                        //console.log(err);
                    })
            };
            $scope.getCourses();

            /*   $scope.createCourses = function(coursesArray){
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
             }}};*/

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

                /* window.onclick = function(event) {
                 if (!event.target.matches('.dropbtn')) {

                 var dropdowns = document.getElementsByClassName("dropdown-content");
                 for (var i = 0; i < dropdowns.length; i++) {
                 var openDropdown = dropdowns[i];
                 if (openDropdown.classList.contains('show')) {
                 openDropdown.classList.remove('show');
                 }
                 }
                 }
                 };*/
            };


            $scope.collegeCourse = function(courses){
                $scope.collegePhoto = null;
                //console.log($scope.courses + " scope.courses here");
                //console.log(courses + " courses here");
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
            /*
             $scope.collegeCourse();
             */
            $scope.types = {UCD: false, TCD:false, DIT:false};
            $scope.searches = {cs:false, ec:false, ms:false, bm:false, ea:false};
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
                    externalLink: c.externalLink
                };

                courseModalService.showModal({}, modalOptions)
            };

/*
            $scope.getMoreDetailedCourse = function (ca) {

                /!*
                 console.log(ca.length);
                 *!/
                var id = null;
                for(var i = 110; i < 165; i++){
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
                /!*function second() {
                 for(var j = 55; j < 110; j++){
                 id = ca[j].course_id;

                 CourseService.getCourse(id)
                 .then(function (res) {
                 $scope.definedCourses = res.data;
                 console.log($scope.definedCourses);
                 }, function (err) {
                 console.log(err + "error here");
                 })
                 }
                 }*!/
            }
*/

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