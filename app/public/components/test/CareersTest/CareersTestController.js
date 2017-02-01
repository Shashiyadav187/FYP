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

            $scope.selectAnswer = function(index){
                $scope.tests[testIndex].questions[0].question[$scope.question_index].selected= index;
                console.log($scope.tests[testIndex].questions[0].question[$scope.question_index].options[index].option);
                $scope.accessQuestion += $scope.tests[testIndex].questions[0].question[$scope.question_index].options[index];

            };

            $scope.defineResult = function(currentAnswer){
                var science = 0,
                    it = 0,
                    medicine = 0,
                    business = 0,
                    communication = 0;
                var sectors = [science, it, medicine, business, communication];

                for(var i = 0; i < sectors.length; i++){
                    sectors[i] += currentAnswer.weight[i];
                }
                return sectors;
            };

            $scope.markQuiz = function(){
                for(var x = 0; x < $scope.tests[testIndex].questions[0].question.length; x++){
                    //$scope.defineResult($scope.tests[testIndex].questions[0].question[x].selected);
                   // console.log($scope.tests[testIndex].questions[0].question[x].);
                    console.log($scope.accessQuestion);
                }
            };

            $scope.finaliseAnswers = function(){
                $scope.finished = true;
                $scope.numQuestionsAnswered = 0;
                $scope.resultsView = true;
                $scope.markQuiz();
                $scope.length = $scope.tests[testIndex].questions[0].question.length;
            };


        }])
})();