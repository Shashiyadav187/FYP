(function(){
    'use strict';
    App.service('CourseService',['$http',
        function($http){

            var baseUrl = 'https://api.unibrowse.ie/api/courses';

            var apiUrl = 'api/courses';

            this.getCourses = function(){
                return $http.get(apiUrl, {cache: true});
            };
            this.getCourse = function (id) {
                return $http.get(baseUrl + '/' + id, {cache: true});
            };

            this.getCurrentCourse = function (id) {
                return $http.get(apiUrl + '/currentCourse/' + id, {cache: true});
            };
            this.updateComments = function (id) {
                return $http.post(apiUrl + '/' + id, {cache: true});
            };

           /* this.getCoursesBySector = function(sector){
                return $http.get(apiUrl + '/' + sector, {cache: true});
            };*/

            /*this.updateCourses = function(course){
                return $http.post(baseUrl + '/' + course);
            }*/

        }])
})();