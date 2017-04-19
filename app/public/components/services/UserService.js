(function(){
    'use strict';
    App.service('UserService',['$http',
    function($http){

        var baseUrl = '/api/users';

        this.getUsers = function(){
            return $http.get(baseUrl);
        };

        this.getCurrentUser = function(){
            return $http.get(baseUrl + '/current');
        };

        this.getById = function(id){
            return $http.get(baseUrl + '/getUserById/' + id);
        };

        this.loginUser = function (username, password) {
            return $http.post(baseUrl + '/login', username, password)
        };

        this.removeResult = function (id, result) {
            return $http.get(baseUrl + '/removeResult/' + id , result)
        };
        this.removeCourse = function (id, courseId) {
            return $http.get(baseUrl + '/removeCourse/' + id +'/'+ courseId)
        };

        /*this.addUser = function(user){
            return $http.post(baseUrl + '/'+ user);
        };*/

        this.updateUser = function(user){
            return $http.put(baseUrl, + '/updateUser' + user.id, user);
        };

        this.deleteUser = function(id){
            return $http.delete(baseUrl);
        };
    }])
})();