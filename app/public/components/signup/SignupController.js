(function(){
    "use strict";

    App.controller('SignupController', ['$scope','$http','$state',
        function($scope, $http, $state){

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

        }]);
})();

