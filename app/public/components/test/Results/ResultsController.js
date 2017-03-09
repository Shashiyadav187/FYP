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
                $scope.labels = ["Computer Science", "Construction & Engineering", "Medecine & Science", "Business & Management", "Arts & Education"];
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
            } else if($scope.winner == "arts"){
                $scope.recommendation= "Education and Arts";
            } else if($scope.winner == "science"){
                $scope.recommendation = "Science";
            } else if($scope.winner == "medicine"){
                $scope.recommendation = "Medicine";
            }else if($scope.winner == "construct"){
                $scope.recommendation = "Construction";
            } else if($scope.winner == "engineering"){
                $scope.recommendation = "Engineering";
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
            $scope.createResult = function(){
                $http.post('/api/results', {
                    testName: 'Careers Test',
                    recommend: $scope.recommendation,
                    timeStamp: Date.now()
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
                $http({
                    method: 'GET',
                    url: '/api/results'
                }).then(function successCallback(response) {
                    var length = (response.data.length - 1);
                    console.log("Success");
                    //console.log("response.data[length] is:" + response.data[length]);
                    $scope.result = response.data[length];
                    console.log($scope.result);
                }, function errorCallback(response) {
                    console.log("Error");
                    console.log(response);
                    $scope.result = null;
                });
            };

            $scope.addRecommendationToUser = function(result, email){
                $http.post('/api/users/pushResult/'+ JSON.parse(email), {
                    results: JSON.parse(result),
                })
                    .success(function(data, status, header, config){
                        if(data.success){
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
                $scope.getResult();
                $timeout( function(){
                    $scope.addRecommendationToUser(JSON.stringify($scope.result), JSON.stringify($scope.user.email));
                }, 2000);
            }
        }]);
})();