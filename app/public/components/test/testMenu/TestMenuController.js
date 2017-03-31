(function(){
    "use strict";

    App.controller('TestMenuController', ['$scope','$state','tableModalService','TestService',
        function($scope, $state, tableModalService, TestService) {

            TestService.getTests()
                .then(function(res){
                    $scope.tests = res.data;
                }, function (err) {
                    console.log(err);
                });

            $scope.spatialLink = function() {
                var modalOptions = {
                    closeButtonText:'Cancel',
                    actionButtonText: 'Take Test',
                    headerText: $scope.tests[0].name+' Rules',
                    bodyText: "One of the answers does not match the question. Find the mismatched pattern. Once you press " +
                    "'Take Test' the timer will start",
                    numQuestions: $scope.tests[0].questions[0].question.length,
                    passPercentage: '70%',
                    timeLimit: '5 Mins'
                };

                tableModalService.showModal({}, modalOptions)
                    .then(function () {
                        $state.go('app.spatialTest');
                    });
            };

            $scope.logicalLink = function() {
                var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Take Test',
                    headerText: $scope.tests[3].name+' Rules',
                    bodyText: 'Answer questions based on preference to receive the sector we recommend you enter',
                    numQuestions: $scope.tests[3].questions[0].question.length,
                    timeLimit: '20 Mins'
                };

                tableModalService.showModal({}, modalOptions)
                    .then(function () {
                        $state.go('app.careersTest');

                    });
            };
            $scope.numericalLink = function() {var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Take Test',
                headerText: $scope.tests[4].name+' Rules',
                bodyText: 'Look carefully for the pattern, and then choose which pair of numbers comes next.',
                numQuestions: $scope.tests[4].questions[0].question.length,
                passPercentage: '70%',
                timeLimit: '10 Mins'
            };

                tableModalService.showModal({}, modalOptions)
                    .then(function () {
                        $state.go('app.numericalTest');
                    });
            };


            /*$scope.otherLink = function() {
             $state.go('app.msTest');
             };
             $scope.ecLink = function() {
             $state.go('app.ecTest');
             };*/




        }]);
})();