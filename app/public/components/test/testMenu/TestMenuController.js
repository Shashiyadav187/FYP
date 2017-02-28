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
                    passPercentage: '80%',
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
                    timeLimit: 'Unlimited'
                };

                tableModalService.showModal({}, modalOptions)
                    .then(function () {
                        $state.go('app.careersTest');

                    });
            };
            $scope.numericalLink = function() {var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Take Test',
                headerText: $scope.tests[1].name+' Rules',
                bodyText: 'Calculate the answers against the clock',
                numQuestions: $scope.tests[1].questions[0].question.length,
                passPercentage: '80%',
                timeLimit: 'Not Long'
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