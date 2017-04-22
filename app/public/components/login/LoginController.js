(function(){
    "use strict";

    App.controller('LoginController', ['$scope','$state','UserService','$http',
        function($scope, $state, UserService, $http) {

            $scope.images = [
                './assets/img/1.jpg',
                './assets/img/2.jpg',
                './assets/img/3.jpg'
            ];

            $scope.home = function () {
              $state.go('app.home');
            };

            $scope.signup = function(){
                $state.go('signup');
            };

            /*$scope.login = function (email, password) {
                console.log("login clicked", email, password);
                $http.post('/api/users/login', email, password)
                    .then(function (res) {
                        if(res.status == 200){
                            console.log("status success")
                        } else if(res.message == 'error'){
                            console.log("error success");
                        }
                        console.log("login success"+ res);
                    })
                    .catch(function (err) {
                        console.log("Error", err)
                    })
            }*/

        }]);
})();