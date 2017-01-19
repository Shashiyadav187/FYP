(function(){
    'use strict';
    App.controller('ProfileController',['$scope', '$state','UserService',
        function($scope, $state, UserService){

            $scope.user = null;

            $scope.top = "Profile Page";


            UserService.getCurrentUser()
                .then(function(res){
                    $scope.user = res.data.user;
                    console.log("Success---------------");
                }, function(err){
                    console.log('Error here--------' + err);
                });
        }])
})();