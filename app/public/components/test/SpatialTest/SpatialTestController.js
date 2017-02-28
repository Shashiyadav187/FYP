(function(){
    "use strict";

    App.controller('SpatialTestController', ['$scope','$state','$http','UserService','$timeout','successModalService',
        function($scope, $state, $http, UserService, $timeout, successModalService) {

            $scope.testName = 'Spatial Reasoning';
            $scope.tests = null;
            $scope.question_index = 0;
            $scope.optionIndex = 0;
            $scope.finished = false;
            $scope.error = false;
            $scope.numQuestionsAnswered = 0;
            $scope.realAnswers = [];
            $scope.numCorrectAnswers = 0;
            $scope.answerSelected = [];
            var testIndex = 0;
            $scope.resultsView = false;
            $scope.resultsActiveQuestion = 0;
            $scope.percentage = 0;
            $scope.result = null;
            $scope.user = null;
            $scope.continue= false;

            $scope.CountdownFinished = function () {
                alert('Finished');
            };
            $scope.getTest = function () {
                $http({
                    method: 'GET',
                    url: '/api/tests/'
                }).then(function successCallback(response) {
                    $scope.tests = response.data;
                }, function errorCallback(response) {
                    console.log("Error");
                    $scope.tests = null;
                });
            };
            $scope.getTest();

            $scope.setActiveQuestion = function(i){
                if(i === undefined){
                    var out = false;
                    var length = $scope.tests[testIndex].questions[0].question.length - 1;

                    while(!out){
                        $scope.question_index = $scope.question_index < length?++$scope.question_index:0;

                        if($scope.question_index === 0){
                            $scope.error = true;
                        }
                        if($scope.tests[testIndex].questions[0].question[$scope.question_index].selected === null){
                            out = true;
                        }
                    }
                }else{
                    $scope.question_index = i;
                }
            };

            $scope.next = function(){
                var length = $scope.tests[testIndex].questions[0].question.length;
                $scope.numQuestionsAnswered = 0;

                for(var x = 0; x < length; x++){
                    if($scope.tests[testIndex].questions[0].question[x].selected !== null){
                        $scope.numQuestionsAnswered++;
                        if($scope.numQuestionsAnswered >= length){
                            for(var i = 0; i < length; i++){
                                if($scope.tests[testIndex].questions[0].question[i].selected === null){
                                    $scope.setActiveQuestion(i);
                                    return;
                                }
                            }
                            if($scope.numQuestionsAnswered == length){
                                $scope.continue = true;
                            }
                            $scope.error = false;
                            return;
                        }
                    }
                }
                $scope.setActiveQuestion();
            };

            $scope.selectAnswer = function(index){
                $scope.tests[testIndex].questions[0].question[$scope.question_index].selected = index;
            };


            $scope.correctTest = function(){
                $scope.realAnswers = $scope.tests[testIndex].answers;
                for(var x = 0; x < $scope.tests[testIndex].questions[0].question.length; x++){
                    if($scope.tests[testIndex].questions[0].question[x].selected === $scope.realAnswers[x]){
                        $scope.tests[testIndex].questions[0].question[x].correct = true;
                        $scope.numCorrectAnswers++;
                    } else {
                        $scope.tests[testIndex].questions[0].question[x].correct = false;
                    }
                }
                $scope.percentage = ($scope.numCorrectAnswers/$scope.tests[testIndex].questions[0].question.length) * 100;
                return $scope.numCorrectAnswers + $scope.percentage;
            };

            $scope.finaliseAnswers = function(){
                $scope.finished = true;
                $scope.resultsView = true;
                $scope.correctTest();
                $scope.length = $scope.tests[testIndex].questions[0].question.length;
                //console.log($scope.numCorrectAnswers + ' out of ' + $scope.tests[testIndex].questions[0].question.length+ ' Correct Answers');
            };

            $scope.setResultsActiveQuestion = function(index){
                $scope.resultsActiveQuestion = index;
            };

            $scope.correctAnswer = function(index){
                if(index === $scope.realAnswers[$scope.resultsActiveQuestion]){
                    return 'bg-success';
                } else if(index === $scope.tests[testIndex].questions[0].question[$scope.resultsActiveQuestion].selected){
                    return 'bg-danger';
                }
            };


            $scope.createResult = function(){
                console.log("First");
                $http.post('/api/results', {
                    testName: $scope.tests[testIndex].name,
                    score: $scope.percentage
                })
                    .success(function(data, status, header, config){
                        if(data.success){
                            console.log(data);
                        } else {
                            console.log("Success :)");
                        }
                    });
            };

            $scope.getResult = function () {
                console.log("Second");
                $http({
                    method: 'GET',
                    url: '/api/results'
                }).then(function successCallback(response) {
                    var length = (response.data.length - 1);
                    console.log("Success");
                    //console.log("response.data[length] is:" + response.data[length]);
                    $scope.result = response.data[length];
                }, function errorCallback(response) {
                    console.log("Error");
                    console.log(response);
                    $scope.result = null;
                });
            };

            $scope.getUser = function(){
                console.log("Third");
                UserService.getCurrentUser()
                    .then(function (res) {
                        $scope.user = res.data.user;
                        //console.log("response.data.user is: "+ res.data.user);
                    }, function (err) {
                        console.log('Get user Error ' + err);
                        $scope.user = null;
                    });
            };

            $scope.addResultToUser = function(result, email){
                $http.post('/api/users/pushResult/'+ JSON.parse(email), {
                    results: JSON.parse(result),
                })
                    .success(function(data, status, header, config){
                        if(data.success){
                            //console.log(data);
                            console.log("Failure possibly");
                        } else {
                            console.log("Success---------- Possibly"+data);
                            var modalOptions = {
                                actionButtonText:'Continue',
                                headerText: 'Careers Test Results Saved'
                            };

                            successModalService.showModal({}, modalOptions)
                                .then(function () {
                                    $state.go('app.home');
                                });
                        }

                    });
            };


            $scope.save = function(){
                $scope.getUser();
                $scope.createResult();
                $scope.getResult();
                $timeout( function(){
                    $scope.addResultToUser(JSON.stringify($scope.result), JSON.stringify($scope.user.email));
                }, 2000);
            };

            $scope.finish = function () {
                $state.go('app.home');
            }

        }]);
})();