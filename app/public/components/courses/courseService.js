(function(){
    'use strict';
    App.service('CourseService',['$http',
        function($http){

            /*var baseUrl = 'https://api.unibrowse.ie/api/homepage';*/

            var baseUrl = 'api/courses';

            this.getCourses = function(){
                return $http.get(baseUrl, {cache: true});
            };

            this.getCourseBySector = function(sector){
                return $http.get(baseUrl + '/' + sector);
            }

        }])
})();