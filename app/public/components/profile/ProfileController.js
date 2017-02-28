(function(){
    'use strict';
    App.controller('ProfileController',['$scope', '$state','UserService',
        function($scope, $state, UserService){

            $scope.user = null;
            $scope.results = false;
            $scope.courses = false;

            $scope.top = "Profile Page";

            /*angular.element(document).ready(function() {
                jQuery('.tabs .tab-links a').on('click', function(e)  {
                    var currentAttrValue = jQuery(this).attr('href');

                    // Show/Hide Tabs
                    jQuery('.tabs ' + currentAttrValue).show().siblings().hide();

                    // Change/remove current tab to active
                    jQuery(this).parent('li').addClass('active').siblings().removeClass('active');

                    e.preventDefault();
                });
            });*/

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

            }
        }])
})();