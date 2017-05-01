(function(){
    "use strict";

    App.controller('homeController', ['$scope','$state','$http','UserService',
        function($scope, $state, $http, UserService) {

            UserService.getCurrentUser()
                .then(function (res) {
                    $scope.currentUser = res.data.user;
                })
                .catch(function (err) {
                    console.log("err");
                });

            $scope.loginLink = function() {
                $state.go('login');
            };

            $scope.testMenu = function() {
                $state.go('app.testMenu');
            };

            $scope.images = [
                './assets/img/laptop.in.use.png'
            ];
            $scope.coursesLink=function(){
                $state.go('app.courses');
            };

            $scope.register = function(){
                $state.go('signup');
            };

            $scope.viewCourses = function () {
                $state.go('app.courses');
            };

            $scope.joinChat = function () {
                $http.get('/api/conversations/'+ $scope.conversationId)
                    .then(function (res) {
                        console.log("res: "+ res)
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            }
        }]);
})();