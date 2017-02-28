(function(){
    "use strict";

    App.controller('SpatialTestController', ['$scope','$state','$http','UserService','$timeout',
        function($scope, $state, $http, UserService, $timeout) {

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

            $scope.getTest = function () {
                $http({
                    method: 'GET',
                    url: '/api/tests/'
                }).then(function successCallback(response) {
                    /*console.log("Success");
                    console.log(response);*/
                    $scope.tests = response.data;
                    /*console.log($scope.tests);*/
                }, function errorCallback(response) {
                    console.log("Error");
                    console.log(response);
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
                // set quizLength variable to keep code clean
                var length = $scope.tests[testIndex].questions[0].question.length;

                $scope.numQuestionsAnswered = 0;
                //For loop added to loop through all questions and recount questions
                //that have been answered. This avoids infinite loops.
                for(var x = 0; x < length; x++){
                    if($scope.tests[testIndex].questions[0].question[x].selected !== null){
                        $scope.numQuestionsAnswered++;
                        if($scope.numQuestionsAnswered >= length){
                            // final check to ensure all questions are actually answered
                            for(var i = 0; i < length; i++){
                                /*
                                 * if find a question that is not answered, set it to
                                 * active question then return from this function
                                 * to ensure finalise flag is not set
                                 */
                                if($scope.tests[testIndex].questions[0].question[i].selected === null){
                                    $scope.setActiveQuestion(i);
                                    return;
                                }
                            }
                            // set finalise flag and remove any existing warnings
                            $scope.error = false;
                            $scope.finished = true;
                            return;
                        }
                    }
                }
                $scope.setActiveQuestion();
            };

            $scope.selectAnswer = function(index){
                $scope.tests[testIndex].questions[0].question[$scope.question_index].selected = index;
/*
                console.log($scope.tests[testIndex].questions[0].question[$scope.question_index].options[index].option);
*/

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
                $scope.numQuestionsAnswered = 0;
                $scope.resultsView = true;
                $scope.correctTest();
                $scope.length = $scope.tests[testIndex].questions[0].question.length;
                console.log($scope.numCorrectAnswers + ' out of ' + $scope.tests[testIndex].questions[0].question.length+ ' Correct Answers');
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

          /*  $scope.finish = function(){
                ModalService.showModal({
                    templateUrl: 'views/modal.html',
                    controller: "ModalController"
                }).then(function(modal) {
                    modal.element.modal();
                    modal.close.then(function() {
                        $state.go('app.home');
                    });
                });

            };*/



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
                            $state.go('app.home');
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

            }

        }]);
})();