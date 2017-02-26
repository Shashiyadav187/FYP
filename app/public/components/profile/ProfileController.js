(function(){
    'use strict';
    App.controller('ProfileController',['$scope', '$state','UserService','$timeout','$window',
        function($scope, $state, UserService, $timeout, $window){

            $scope.user = null;
            $scope.results = false;
            $scope.courses = false;
         /*   var _startCountdown = function(){
                var timerCount = 300;

                var countDown = function () {
                    if (timerCount < 0) {
                        //Any desired function upon countdown end.
                       // $window.close();
                        alert('finished');
                    } else {
                        $scope.countDownLeft = timerCount;
                        $scope.countdownMins = $scope.countDownLeft%60;
                        timerCount--;
                        $timeout(countDown, 1000);
                    }
                };
                $scope.countDownLeft = timerCount;
                countDown();
            };
            _startCountdown();*/

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

            $scope.removeFromDB = function(result){
                var index = $scope.user.results.indexOf(result);
                console.log(index);
                console.log($scope.user.results[index]);
                delete $scope.user.results[index];

                UserService.updateUser($scope.user)
                    .then(function (res) {
                        $scope.user = res.data;
                            console.log("Success "+$scope.user);
                    }, function (err) {
                        console.log(err);
                    })
            };
        }]);
        /*.filter('currentdate',['$filter',  function(userDate, $filter) {
            return function() {
                return $filter('date')(userDate, 'yyyy-MM-dd HH:mm');
            };
        }])*/
})();