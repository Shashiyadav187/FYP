(function(){
    App.controller('ProfileController',['$scope', '$state','UserService','$timeout','$window','$http','profileImageModalService','TestService','successModalService',
        function($scope, $state, UserService, $timeout, $window, $http, profileImageModalService, TestService, successModalService){

            $scope.user = null;
            $scope.results = false;
            $scope.coursesTab = false;
            $scope.showStats = false;
            $scope.firstFifth = 0;
            $scope.secondFifth = 0;
            $scope.thirdFifth = 0;
            $scope.fourthFifth = 0;
            $scope.fifthFifth = 0;
            $scope.averageResults = 0;

            $scope.doughnutLabels = ["0-20%", "21-40", "41-60",
                "61-80", "81-100"];
            $timeout(function () {

            }, 2000);



            TestService.getTests()
                .then(function (res) {
                    $scope.tests = res.data;
                })
                .catch(function (err) {
                    console.log(err);
                });


            UserService.getUsers()
                .then(function (res) {
                    $scope.users = res.data;
                })
                .catch(function (err) {
                    console.log(err);
                });

            var totalResults = 0;

            $timeout(function () {
                for(var i = 0;i< $scope.users.length; i++){
                    for(var x = 0; x < $scope.users[i].results.length; x++){
                        if($scope.users[i].results[x].testName == 'Careers Test'){
                        }else {
                            if ($scope.users[i].results[x].score >= 0 &&
                                $scope.users[i].results[x].score <= 20){
                                //$scope.averageResults += $scope.users[i].results[x].score;
                                $scope.firstFifth++;
                            } else if($scope.users[i].results[x].score > 20 &&
                                $scope.users[i].results[x].score <= 40){
                                //$scope.averageResults += $scope.users[i].results[x].score;
                                $scope.secondFifth++;
                            } else if($scope.users[i].results[x].score > 40 &&
                                $scope.users[i].results[x].score <= 60){
                                //$scope.averageResults += $scope.users[i].results[x].score;
                                $scope.thirdFifth++;
                            } else if($scope.users[i].results[x].score > 60 &&
                                $scope.users[i].results[x].score <= 80){
                                //$scope.averageResults += $scope.users[i].results[x].score;
                                $scope.fourthFifth++;
                            } else if($scope.users[i].results[x].score > 80 &&
                                $scope.users[i].results[x].score <= 100){
                                //$scope.averageResults += $scope.users[i].results[x].score;
                                $scope.fifthFifth++;
                            }
                            totalResults++;
                        }
                    }
                    //console.log("Total Average: "+$scope.averageResults);
                }
                $scope.doughnutData = [(($scope.firstFifth/totalResults)*100), (($scope.secondFifth/totalResults)*100),
                    (($scope.thirdFifth/totalResults)*100), (($scope.fourthFifth/totalResults)*100),
                    (($scope.fifthFifth/totalResults)*100)];

                /*$scope.averageResults = $scope.averageResults/
                 console.log()*/
            }, 500);

            $scope.options = {
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            suggestedMax: 100,    // minimum will be 0, unless there is a lower value.
                            // OR //
                            beginAtZero: true   // minimum value will be 0.
                        }
                    }]
                }
            };

            $scope.getCurrentUser = function () {
                UserService.getCurrentUser()
                    .then(function (res) {
                        $scope.user = res.data.user;
                        console.log("Success---------------");
                    }, function (err) {
                        console.log('Error here--------' + err);
                    });
            };
            $scope.getCurrentUser();

            $scope.myAverage = 0;
            $scope.lineLabels = [];

            /*Date labels*/
            $timeout(function () {
                $scope.lineData = [];
                for(var i = 0; i < $scope.user.results.length; i++){
                    if($scope.user.results[i].testName == 'Careers Test'){

                    } else {
                        $scope.myAverage += $scope.user.results[i].score;
                        $scope.lineData.push($scope.user.results[i].score);
                        var d = new Date($scope.user.results[i].timeStamp).getDate();
                        var m = new Date($scope.user.results[i].timeStamp).getMonth();
                        var h = new Date($scope.user.results[i].timeStamp).getHours();
                        var mm = new Date($scope.user.results[i].timeStamp).getUTCMinutes();
                        var yy = new Date($scope.user.results[i].timeStamp).getFullYear();
                        var date  = d+'/'+m+'/'+yy+'  '+h+':'+mm;
                        //console.log("date : "+date);
                        $scope.lineLabels.push(date);
                    }
                }
                $scope.myAverage = Math.round($scope.myAverage/$scope.user.results.length, 2);
                /*console.log("MY total average: "+$scope.myAverage);
                 console.log("Line data: "+$scope.lineData);
                 console.log("Line labels: "+$scope.lineLabels);*/
            }, 500);

            $scope.cs = 0;
            $scope.ec = 0;
            $scope.ms = 0;
            $scope.bm = 0;
            $scope.ea = 0;
            $scope.scs = 0;
            $scope.sec = 0;
            $scope.sms = 0;
            $scope.sbm = 0;
            $scope.sea = 0;

            /*Recently Viewed*/
            $timeout(function () {
                var looped = 0;
                if($scope.user.recentlyViewed.length >= 10) {
                    do {
                        for (var i = $scope.user.recentlyViewed.length - 1; i >= 0; i--) {
                            switch ($scope.user.recentlyViewed[i].sector) {
                                case 'Computer Science':
                                    $scope.cs++;
                                    break;
                                case 'Engineering and Construction' :
                                    $scope.ec++;
                                    break;
                                case 'Medicine and Science' :
                                    $scope.ms++;
                                    break;
                                case 'Business and Management' :
                                    $scope.bm++;
                                    break;
                                case 'Education and Arts' :
                                    $scope.ea++;
                                    break;
                            }
                            looped++;
                        }
                    } while (looped <= 10);
                } else {
                    for (var x = 0; x < $scope.user.recentlyViewed.length; x++) {
                        switch ($scope.user.recentlyViewed[x].sector) {
                            case 'Computer Science':
                                $scope.cs++;
                                break;
                            case 'Engineering and Construction' :
                                $scope.ec++;
                                break;
                            case 'Medicine and Science' :
                                $scope.ms++;
                                break;
                            case 'Business and Management' :
                                $scope.bm++;
                                break;
                            case 'Education and Arts' :
                                $scope.ea++;
                                break;
                        }
                    }
                }
                $scope.data = [$scope.cs, $scope.ec, $scope.ms, $scope.bm, $scope.ea];
            }, 500);

            /*Sectors*/
            $timeout(function () {
                for (var i = 0; i < $scope.user.courses.length; i++) {
                    switch ($scope.user.courses[i].sector) {
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
                $scope.sdata = [$scope.scs,$scope.sec,$scope.sms,$scope.sbm,$scope.sea]
            }, 500);


            $scope.labels = ["Computer Science", "Construction & Engineering", "Medicine & Science", "Business & Management", "Arts & Education"];

            //$scope.myRecommendation = function () {
            $scope.sectorRecArr = [];
            $timeout(function () {
                var comps = $scope.scs + $scope.cs;
                var engcons = $scope.sec + $scope.ec;
                var meds = $scope.sms + $scope.ms;
                var bam = $scope.sbm + $scope.bm;
                var eda = $scope.sea + $scope.ea;

                for(var i = 0; i < $scope.user.results.length; i++){
                    switch ($scope.user.results[i].testName){
                        case 'Careers Test':
                            switch ($scope.user.results[i].recommend) {
                                case 'Computer Science':
                                    comps++;
                                    break;
                                case 'Engineering and Construction' :
                                    engcons++;
                                    break;
                                case 'Medicine and Science' :
                                    meds++;
                                    break;
                                case 'Business and Management' :
                                    bam++;
                                    break;
                                case 'Education and Arts' :
                                    eda++;
                                    break;
                                default:console.log("nothing found");
                                    break;
                            }break;
                        case 'Spatial Reasoning':
                            var res = $scope.user.results[i].score;
                            if(res < 40){
                                meds++;
                                bam++;
                                eda++;
                            } else if(res >= 40 && res < 70){
                                comps++;
                                engcons++;
                            }  else{
                                comps = comps+2;
                                engcons = engcons+2;
                            }
                            break;
                        case 'Logical Number Series Test':
                            if(res < 40){
                                meds++;
                                bam++;
                                eda++;
                            } else if(res >= 40 && res < 70){
                                comps++;
                                engcons++;
                            } else{
                                comps = comps+2;
                                engcons = engcons+2;
                            }
                            break;
                    }
                }
                $scope.sectorRecArr.push(comps, engcons, meds, bam, eda);
                console.log("Array: "+$scope.sectorRecArr);
                var largest = Math.max.apply(Math, $scope.sectorRecArr);
                if(largest == $scope.sectorRecArr[0]){
                    $scope.recommendedSector = 'Computer Science';
                } else if(largest == $scope.sectorRecArr[1]){
                    $scope.recommendedSector = 'Engineering and Construction';
                } else if(largest == $scope.sectorRecArr[2]){
                    $scope.recommendedSector = 'Medicine and Science';
                } else if(largest == $scope.sectorRecArr[3]){
                    $scope.recommendedSector = 'Business and Management';
                } else if(largest == $scope.sectorRecArr[4]){
                    $scope.recommendedSector = 'Education and Arts';
                }
            }, 700);

            //};

            $scope.changeBackground = function () {
                var modalOptions = {
                    closeButtonText:'Cancel',
                    actionButtonText: 'OK',
                    headerText: 'Select a photo'
                };
                profileImageModalService.showModal({}, modalOptions);
                $scope.getCurrentUser();
            };

            $scope.goToSector = function (sector) {
                console.log(sector+" ---sectorName here");
                $state.go('app.definedCourses',{
                    sectorName: JSON.stringify(sector)
                });
            };

            $scope.removeResult = function (resultId) {
                UserService.removeResult($scope.user._id, resultId)
                    .then(function (res) {
                        console.log("Remove Result Success");
                        var modalOptions = {
                            actionButtonText: 'Continue',
                            headerText: 'Result Successfully Removed'
                        };
                        successModalService.showModal({}, modalOptions);
                        $scope.getCurrentUser();
                    })
                    .catch(function (err) {
                        console.log("Error Removing Result");
                    })
            };

            $scope.removeCourse = function (courseId) {
                UserService.removeCourse($scope.user._id, courseId)
                    .then(function (res) {
                        console.log("Remove Course Success");
                        var modalOptions = {
                            actionButtonText: 'Continue',
                            headerText: 'Course Successfully Removed'
                        };
                        successModalService.showModal({}, modalOptions);
                        $scope.getCurrentUser();
                    })
                    .catch(function (err) {
                        console.log("Error Removing Course");
                    })
            };

            $scope.goToCourses = function () {
                $state.go('app.courses');
            }

        }])
        .directive('tab', function() {
            return {
                restrict: 'E',
                transclude: true,
                template: '<div role="tabpanel" ng-show="active" ng-transclude></div>',
                require: '^tabset',
                scope: {
                    heading: '@'
                },
                link: function (scope, elem, attr, tabsetCtrl) {
                    scope.active = false;
                    tabsetCtrl.addTab(scope);
                }
            };
        })
        .directive('tabset', function() {
            return {
                restrict: 'E',
                transclude: true,
                templateUrl: 'views/tabset.html',
                bindToController: true,
                controllerAs: 'tabset',
                controller: function () {
                    var self= this;
                    self.tabs = [];
                    self.addTab  =function addTab(tab) {
                        self.tabs.push(tab);

                        if(self.tabs.length == 1){
                            tab.active = true;
                        }
                    };
                    self.select = function (selectedTab) {
                        angular.forEach(self.tabs, function (tab) {
                            if(tab.active && tab !== selectedTab){
                                tab.active = false;
                            }
                        });
                        selectedTab.active = true;
                    }
                }
            };
        })
})();