(function(){
    'use strict';

    App.controller('CareersTestController', [ '$scope', '$state','TestService',
        function($scope, $state, TestService){

            $scope.testName = 'Careers Test';
            $scope.tests = null;
            var testIndex = 1;
            $scope.question_index = 0;
            $scope.numQuestionsAnswered = 0;
            $scope.error = false;
            $scope.finished = false;
            $scope.accessQuestion = [];
            $scope.array = [];


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
                // set quizLength variable to keep code clean
                var length = $scope.tests[testIndex].questions[0].question.length;

                $scope.numQuestionsAnswered = 0;
                //For loop added to loop through all questions and recount questions
                //that have been answered. This avoids infinite loops.

                for(var x = 0; x < length; x++){
                    if($scope.tests[testIndex].questions[0].question[$scope.question_index].selected !== null){
                        $scope.numQuestionsAnswered++;
                        if($scope.numQuestionsAnswered >= length){
                            // final check to ensure all questions are actuall answered
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
                $scope.numQuestionsAnswered = 0;
                $scope.resultsView = true;
                $scope.markQuiz();

                $scope.labels = ["IT", "Construction", "Health Care", "Business", "Arts"];
                $scope.options = {
                    responsive: true,
                    scales: {
                        xAxes: [{
                            stacked: false,
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                };
                $scope.data = [$scope.array[0].it, $scope.array[0].construction, $scope.array[0].healthcare, $scope.array[0].business, $scope.array[0].arts];

                /*var largest = Math.max.apply(Math, $scope.data);
                console.log(largest);*/
                console.log($scope.data);
                var temp = 0;
                for(var i =0; i<=$scope.data.length; i++){
                    if($scope.data[i] > temp){
                        temp = $scope.data[i];
                    }
                }

                console.log($scope.data.indexOf(temp));
                var position = $scope.data.indexOf(temp);
                console.log(Object.keys($scope.array[0])[position]);
                $scope.recommendation = Object.keys($scope.array[0])[position];


            };



        }])
})();