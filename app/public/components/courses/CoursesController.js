(function(){
    'use strict';

    App.controller('CoursesController', [ '$scope', '$state','CourseService','$http',
        function($scope, $state, CourseService, $http){

            $scope.courses = null;

            $scope.getCourses = function(){
                CourseService.getCourses()
                    .then(function (res) {
                        $scope.courses = res.data;
                        console.log("data is "+ res.data);
                    }, function (err) {
                        console.log('Error ' + err);
                        $scope.course = null;
                        console.log(err);
                    })
            };
            $scope.getCourses();

            /*course.title = req.body.title;
             course.course_id = req.body.course_id;
             course.duration = req.body.duration;
             course.college = req.body.college;
             course.sectors = req.body.sectors;
             course.points = req.body.points;*/

            /*$scope.createCourses = function(courses){
                for(var i = 0; i<$scope.courses.length; i++){
                    if(courses[i].institution.title == "Dublin Institute of Technology"){
                $http.post('/api/courses', {
                    title : courses[i].title,
                    course_id : courses[i].course_id,
                    duration : courses[i].duration,
                    college : courses[i].institution.title,
                    points : courses[i].points
                })
                    .success(function(data, status, header, config){
                        if(data.success){
                            console.log(data);
                        } else {
                            console.log("Success :)");
                            console.log(data);
                        }
                    });
            }}};*/



           /* $scope.getCoursesa = function(){
                $http.get('https://api.unibrowse.ie/api/homepage'
                    .success(function(data, status, header, config){
                        if(data.success){
                            //console.log(data);
                            console.log("Failure possibly");
                        } else {
                            console.log("Success---------- Possibly"+data);
                        }

                    });
            };*/

        }])
})();