(function(){
    'use strict';

    App.controller('CareersTestController', [ '$scope', '$state','TestService',
        function($scope, $state, TestService){

            $scope.testName = 'Careers Test';
            $scope.tests = null;
            var testIndex = 3;
            $scope.question_index = 0;
            $scope.numQuestionsAnswered = 0;
            $scope.error = false;
            $scope.finished = false;
            $scope.accessQuestion = [];
            $scope.array = [];
            $scope.resultsPage = false;
            $scope.continue = false;

            $scope.getTests = function(){
                TestService.getTests()
                    .then(function (res) {
                        $scope.tests = res.data;
                    }, function (err) {
                        console.log('Get tests Error ' + err);
                        $scope.tests = null;
                    })
            };
            $scope.getTests();


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
                    if($scope.tests[testIndex].questions[0].question[$scope.question_index].selected !== null){
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
                            $scope.finished = true;
                            return;
                        }
                    }
                }
                $scope.setActiveQuestion();
            };

            $scope.defineResult = function(currentAnswer){
                var sectors = {
                    "it":0,
                    "construction":0,
                    "healthcare":0,
                    "business":0,
                    "arts":0
                };

                sectors.it+=currentAnswer.weight[0];
                sectors.construction+=currentAnswer.weight[1];
                sectors.healthcare+=currentAnswer.weight[2];
                sectors.business+=currentAnswer.weight[3];
                sectors.arts+=currentAnswer.weight[4];

                if($scope.array.length!=0){
                    $scope.array[0].it+=sectors.it;
                    $scope.array[0].construction+=sectors.construction;
                    $scope.array[0].healthcare+=sectors.healthcare;
                    $scope.array[0].business+=sectors.business;
                    $scope.array[0].arts+=sectors.arts;
                }else{
                    $scope.array.push(sectors);
                }
                console.log(JSON.stringify($scope.array)+" array");

            };

            $scope.selectAnswer = function(index){
                $scope.tests[testIndex].questions[0].question[$scope.question_index].selected= index;
                //console.log($scope.tests[testIndex].questions[0].question[$scope.question_index].options[index].option);
                console.log(index);
            };


            $scope.markQuiz = function(){
                // var length = $scope.tests[testIndex].questions[0].question.length;
                for(var x = 0; x < $scope.tests[testIndex].questions[0].question.length; x++){
                    var index = $scope.tests[testIndex].questions[0].question[x].selected;
                    $scope.defineResult($scope.tests[testIndex].questions[0].question[x].options[index]);
                }
                console.log("finished marking");
            };

            $scope.finaliseAnswers = function(){
                $scope.finished = true;
                $scope.resultsView = true;
                $scope.markQuiz();

                $state.go('app.results',{
                        sectorsArray: JSON.stringify($scope.array)
                    });

            };

            $scope.finish = function () {
                $state.go('app.home');
            }
        }])
})();