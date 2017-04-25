(function(){
    'use strict';
    App.service('CourseService',['$http',
        function($http){

            var baseUrl = 'https://api.unibrowse.ie/api/courses';

            var uniBrowseUrl = "https://api.unibrowse.ie/api/homepage";

            var apiUrl = 'api/courses';

            this.getCourses = function(){
                return $http.get(apiUrl, {cache: true});
            };
            this.getCourse = function (id) {
                return $http.get(apiUrl + '/byId/' + id, {cache: true});
            };

            this.getCurrentCourse = function (id) {
                return $http.get(apiUrl + '/currentCourse/' + id);
            };
            this.addComment = function (id, comment) {
                return $http.post(apiUrl + '/addComment/' + id, comment);
            };

            this.getComment = function (id) {
                return $http.get(baseUrl + '/' + id);
            };

           /* this.getCoursesBySector = function(sector){
                return $http.get(apiUrl + '/' + sector, {cache: true});
            };*/


            /*this.updateCourses = function(course){
                return $http.post(baseUrl + '/' + course);
            }*/

        }])
})();