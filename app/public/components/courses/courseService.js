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

            this.getCourseBySector = function(sector){
                return $http.get(baseUrl + '/' + sector, {cache: true});
            };

            /*this.updateCourses = function(course){
                return $http.post(baseUrl + '/' + course);
            }*/

        }])
})();