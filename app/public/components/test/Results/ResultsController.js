(function(){
    'use strict';

    App.controller('ResultsController',['$scope', '$state', '$stateParams',
        function($scope, $state, $stateParams){

            /*$scope.getCourseBySector = function() {
                CourseService.getCourses()
                    .then(function (res) {
                        $scope.courses = res.data;
                    }).error(function(err){
                    console.log(err);
                })
            }*/
            $scope.labels = ["IT", "Construction", "Health Care", "Business", "Arts"];
            $scope.colours = ['#97BBCD','#66BB6A','#F7464A','#46BFBD','#FDB45C'];
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

            $scope.data = [$scope.array[0].it, $scope.array[0].construction, $scope.array[0].healthcare, $scope.array[0].business, $scope.array[0].arts];

          console.log($scope.data+ ' scope.data');
          console.log($scope.array[0]+ ' scope array[0]');
          console.log($scope.array[0].it+ ' scope array[0].it');
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
            } else if($scope.winner == "healthcare"){
                $scope.recommendation = "Medicine and Science";
            } else if($scope.winner == "business"){
                $scope.recommendation = "Business and Management";
            } else if($scope.winner == "arts"){
                $scope.recommendation= "Education and Arts";
            }
            console.log($stateParams.sectorsArray, 'resultsController');
        }]);
})();