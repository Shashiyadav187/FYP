(function(){
    'use strict';

    App.controller('ResultsController',['$scope', '$state', '$stateParams','UserService','$http','$timeout','successModalService',
        function($scope, $state, $stateParams, UserService, $http, $timeout, successModalService){

            $scope.user = null;
            $scope.takeTest = false;
            $scope.testType = null;
            /*
             $scope.colours = ['#97BBCD','#66BB6A','#F7464A','#46BFBD','#FDB45C'];
             */
            $scope.options = {
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMax : 100,
                            beginAtZero:true
                        }
                    }]
                }
            };
            $scope.array = JSON.parse($stateParams.sectorsArray);

            /*   console.log($scope.array + " array");
             console.log($scope.array[0].engineering + " array[0].e");
             console.log($scope.array[0] + " array[0]");
             console.log($scope.array.length + " array.length");
             */

            if($scope.array[0].science){
                $scope.colours = ['#F7464A', '#f97d80'];
                $scope.data = [$scope.array[0].science, $scope.array[0].medicine];
                $scope.labels = ["Science", "Medicine"];
            } else if($scope.array[0].engineering){
                $scope.colours = ['#66BB6A', '#93cf96'];
                $scope.data = [$scope.array[0].engineering, $scope.array[0].construct];
                $scope.labels = ["Engineering", "Construction"];
            } else{
                $scope.colours = ['#97BBCD','#66BB6A','#F7464A','#46BFBD','#FDB45C'];
                $scope.labels = ["Computer Science", "Construction & Engineering", "Medicine & Science", "Business & Management", "Arts & Education"];
                $scope.data = [$scope.array[0].it, $scope.array[0].construction, $scope.array[0].healthcare, $scope.array[0].business, $scope.array[0].arts];
            }



            console.log($scope.data+ ' scope.data');
            /* console.log($scope.array[0]+ ' scope array[0]');
             console.log($scope.array[0].it+ ' scope array[0].it');*/
            var temp = 0;

            for(var i =0; i<=$scope.data.length; i++){
                if($scope.data[i] > temp){
                    temp = $scope.data[i];
                }
            }

            console.log($scope.data.indexOf(temp));
            var position = $scope.data.indexOf(temp);
            console.log(Object.keys($scope.array[0])[position]);
            $scope.winner = Object.keys($scope.array[0])[position];

            if($scope.winner == 'it'){
                $scope.recommendation = "Computer Science";
                $scope.testType = "cs";
            } else if($scope.winner == 'construction'){
                $scope.recommendation = 'Engineering and Construction';
                $scope.takeTest = true;
                $scope.testType = "ec";
            } else if($scope.winner == "healthcare"){
                $scope.recommendation = "Medicine and Science";
                $scope.takeTest = true;
                $scope.testType = "ms";
            } else if($scope.winner == "business"){
                $scope.recommendation = "Business and Management";
                $scope.testType = "bm";
            } else if($scope.winner == "arts"){
                $scope.recommendation= "Education and Arts";
                $scope.testType = "ea";
            } else if($scope.winner == "science"){
                $scope.recommendation = "Science";
                $scope.testType = "s";
            } else if($scope.winner == "medicine"){
                $scope.recommendation = "Medicine";
                $scope.testType = "m";
            }else if($scope.winner == "construct"){
                $scope.recommendation = "Construction";
                $scope.testType = "c";
            } else if($scope.winner == "engineering"){
                $scope.recommendation = "Engineering";
                $scope.testType = "e";
            }
            console.log($stateParams.sectorsArray, 'resultsController');

            $scope.getUser = function() {
                UserService.getCurrentUser()
                    .then(function (res) {
                        $scope.user = res.data.user;
                    }, function (err) {
                        console.log(err);
                    });
            };

            UserService.getUsers()
                .then(function (res) {
                    $scope.users = res.data;
                    console.log($scope.users+" users");
                    $scope.createRadarGraph();
                }).catch(function (err) {
                console.log(err+" err");
            });

            $scope.scs = 0;
            $scope.sec = 0;
            $scope.sms = 0;
            $scope.sbm = 0;
            $scope.sea = 0;

            $scope.createRadarGraph = function () {
                for (var i = 0; i < $scope.users.length; i++) {
                    for (var x = 0; x < $scope.users[i].results.length; x++) {
                        if($scope.users[i].results[x].testName =='Careers Test') { console.log("found ct");
                            switch ($scope.users[i].results[x].recommend) {
                                case 'Computer Science':
                                    $scope.scs++;
                                    break;
                                case 'Engineering and Construction' :
                                    $scope.sec++;
                                    break;
                                case 'Medicine and Science' :
                                    $scope.sms++;
                                    break;
                                case 'Business and Management' :
                                    $scope.sbm++;
                                    break;
                                case 'Education and Arts' :
                                    $scope.sea++;
                                    break;
                            }
                        }
                    }
                }
                $scope.sdata = [$scope.scs,$scope.sec,$scope.sms,$scope.sbm,$scope.sea]
            };
            $scope.slabels = ["Computer Science", "Construction & Engineering", "Medicine & Science", "Business & Management", "Arts & Education"];

            $scope.createResult = function(){
                $http.post('/api/results', {
                    testName: 'Careers Test',
                    recommend: $scope.recommendation,
                    timeStamp: Date.now()
                }).then(function (res) {
                    $scope.result = res.data.result;
                    console.log(res.data);
                }).catch(function (err) {
                    console.log("error: "+err)
                })
            };


            $scope.addRecommendationToUser = function(result, email){
                $http.post('/api/users/pushResult/'+ JSON.parse(email), {
                    results: JSON.parse(result),
                }).then(function (res) {
                    console.log("Success addResToUser");
                    var modalOptions = {
                        actionButtonText:'Continue',
                        headerText: 'Careers Test Results Saved'
                    };

                    successModalService.showModal({}, modalOptions)
                        .then(function () {
                            $state.go('app.home');
                        });
                }).catch(function (err) {
                    console.log("Error addedResToUser: "+err);
                })
            };

            $scope.takeAnotherTest = function(){
                if($scope.testType == "ec"){
                    $state.go('app.ecTest');
                } else if ($scope.testType = "ms"){
                    $state.go('app.msTest');
                }
            };

            $scope.definedCourses = function(){
                console.log($scope.recommendation+" ---sectorName here");
                $state.go('app.definedCourses',{
                    sectorName: JSON.stringify($scope.recommendation)
                });
            };

            $scope.saveResult = function(){

                $scope.getUser();
                $scope.createResult();
                $timeout( function(){
                    $scope.addRecommendationToUser(JSON.stringify($scope.result), JSON.stringify($scope.user.email));
                }, 2000);
            };

            $http.get('/api/sectors')
                .then(function(res){
                    $scope.sectors = res.data;
                    console.log($scope.sectors+" sectors");
                    console.log(res.data+" res.data")
                }, function(err){
                    console.log(err+" error sectors");
                });
        }]);
})();