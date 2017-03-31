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

        /*this.addUser = function(user){
            return $http.post(baseUrl + '/'+ user);
        };*/

        this.updateUser = function(user){
            return $http.put(baseUrl, + '/' + user.id, user);
        };

        this.deleteUser = function(id){
            return $http.delete(baseUrl);
        };
    }])
})();