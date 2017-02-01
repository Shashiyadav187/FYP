(function(){
    'use strict';
    App.service('TestService',['$http',
        function($http){

            var baseUrl = '/api/tests';

            this.getTests = function(){
                return $http.get(baseUrl);
            };

            this.getTestById = function(id){
                return $http.get(baseUrl + '/' + id);
            };

            this.addTest = function(test){
                return $http.post(baseUrl + '/'+ test);
            };

            this.updateTest = function(test){
                return $http.put(baseUrl, + '/' + test.id, test);
            };

            this.deleteTest = function(id){
                return $http.delete(baseUrl);
            };
        }])
})();
