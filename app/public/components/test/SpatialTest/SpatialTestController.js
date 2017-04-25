(function(){
    "use strict";

    App.controller('SpatialTestController', ['$scope','$state','$http','UserService','$timeout','successModalService',
        function($scope, $state, $http, UserService, $timeout, successModalService) {

            $scope.testName = 'Spatial Reasoning';
            $scope.tests = null;
            $scope.question_index = 0;
           // $scope.optionIndex = 0;
            $scope.finished = false;
            $scope.error = false;
            $scope.numQuestionsAnswered = 0;
            $scope.realAnswers = [];
            $scope.numCorrectAnswers = 0;
            //$scope.answerSelected = [];
            var testIndex = 0;
            $scope.resultsView = false;
            $scope.resultsActiveQuestion = 0;
            $scope.percentage = 0;
            $scope.result = null;
            $scope.user = null;
            $scope.continue= false;

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
                $scope.getGraphResults();
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
                    score: $scope.percentage,
                    timeStamp: Date.now()
                })
                    .success(function(data, status, header, config){
                        if(data.success){
                            console.log("Error create result "+data);
                        } else {
                            console.log("Success  create Result:)");
                            $http({
                                method: 'GET',
                                url: '/api/results'
                            }).then(function successCallback(response) {
                                var length = (response.data.length - 1);
                                console.log("Success get result");
                                //console.log("response.data[length] is:" + response.data[length]);
                                $scope.result = response.data[length];
                                console.log($scope.user);
                                console.log($scope.result);
                                $http.post('/api/users/pushResult/'+ $scope.user.email, {
                                    results: $scope.result,
                                })
                                    .success(function(data, status, header, config){
                                        if(data.success){
                                            //console.log(data);
                                            console.log("Failure post result tp user");
                                        } else {
                                            console.log("Success post to user with data: "+data);
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
                            }, function errorCallback(response) {
                                console.log("Error get result");
                                console.log(response);
                                $scope.result = null;
                            });
                        }
                    }
                    );
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
            $scope.getUser();

            $scope.finish = function () {
                $state.go('app.home');
            };

            UserService.getUsers()
                .then(function (res) {
                    $scope.users = res.data;
                    console.log($scope.users+" users");
                    //$scope.getGraphResults();
                }).catch(function (err) {
                console.log(err+" err");
            });

            $scope.firstFifth = 0;
            $scope.secondFifth = 0;
            $scope.thirdFifth = 0;
            $scope.fourthFifth = 0;
            $scope.fifthFifth = 0;

            $scope.getGraphResults= function () {
                for(var i = 0;i< $scope.users.length; i++){
                    for(var x = 0; x < $scope.users[i].results.length; x++){
                        if($scope.users[i].results[x].testName == 'Spatial Reasoning'){
                            if ($scope.users[i].results[x].score >= 0 &&
                                $scope.users[i].results[x].score <= 20){
                                $scope.firstFifth++;
                            } else if($scope.users[i].results[x].score > 20 &&
                                $scope.users[i].results[x].score <= 40){
                                $scope.secondFifth++;
                            } else if($scope.users[i].results[x].score > 40 &&
                                $scope.users[i].results[x].score <= 60){
                                $scope.thirdFifth++;
                            } else if($scope.users[i].results[x].score > 60 &&
                                $scope.users[i].results[x].score <= 80){
                                $scope.fourthFifth++;
                            } else if($scope.users[i].results[x].score > 80 &&
                                $scope.users[i].results[x].score <= 100){
                                $scope.fifthFifth++;
                            }
                        }else {
                            console.log("not spatial reasoning")
                        }
                    }
                    //console.log("Total Average: "+$scope.averageResults);
                }
                $scope.ddata = [$scope.firstFifth, $scope.secondFifth, $scope.thirdFifth, $scope.fourthFifth,
                    $scope.fifthFifth];
            };

            $scope.dlabels = ["0-20%", "21-40", "41-60",
                "61-80", "81-100"];
            //$scope.dlabels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
            $scope.ddata = [300, 500, 100];

            $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
            $scope.series = ['Series A', 'Series B'];
            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ];
            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };
            $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
            $scope.options = {
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                        },
                        {
                            id: 'y-axis-2',
                            type: 'linear',
                            display: true,
                            position: 'right'
                        }
                    ]
                }
            };

        }]);
})();