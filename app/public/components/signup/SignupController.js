(function(){
    "use strict";

    App.controller('SignupController', ['$scope','$http','$state',
        function($scope, $http, $state){

            $scope.edType = null;
            $scope.home = function () {
                $state.go('app.home');
            };

            $scope.createUser = function(){
                $http.post('/api/users', {
                    firstName: $scope.user.firstName,
                    lastName: $scope.user.lastName,
                    email: $scope.user.email,
                    password: $scope.user.password
                })
                    .success(function(data, status, header, config){
                        if(data.success){
                            console.log('success');
                        } else {
                            console.log(data, status, header, config);
                            $state.go('login');
                        }
                    });
            };

            $scope.images = [
                './assets/img/1.jpg',
                './assets/img/2.jpg',
                './assets/img/3.jpg'
            ];

        }]);
})();

