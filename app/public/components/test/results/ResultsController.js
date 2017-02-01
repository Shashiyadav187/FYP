(function(){
    'use strict';

    App.controller('ResultsController',['$scope', '$state',
        function($scope, $state){

            $scope.displayMessage = "Hello Results Page";

            $scope.display = function(){
                console.log("Hello and test the results");
            };

            $scope.display();
        }]);
})();