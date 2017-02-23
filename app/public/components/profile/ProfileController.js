(function(){
    'use strict';
    App.controller('ProfileController',['$scope', '$state','UserService',
        function($scope, $state, UserService){

            $scope.user = null;
            $scope.results = false;
            $scope.courses = false;

            $scope.top = "Profile Page";


            UserService.getCurrentUser()
                .then(function(res){
                    $scope.user = res.data.user;
                    console.log("Success---------------");
                }, function(err){
                    console.log('Error here--------' + err);
                });

            $scope.showResults = function(){
                $scope.results = true;
                $scope.courses = false;
            };
            $scope.showCourses = function(){
                $scope.courses = true;
                $scope.results = false;
            };

            $scope.images = [
                './assets/img/1.jpg',
                './assets/img/2.jpg',
                './assets/img/3.jpg'
            ];
        }])
})();