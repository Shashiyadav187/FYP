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

            $timeout(function () {
                $scope.doughnutLabels = ["0-20%", "21-40", "41-60",
                    "61-80", "81-100"];
                $scope.doughnutData = [$scope.firstFifth, $scope.secondFifth, $scope.thirdFifth, $scope.fourthFifth, $scope.fifthFifth];
            }, 2000);



            TestService.getTests()
                .then(function (res) {
                    $scope.tests = res.data;
                })
                .catch(function (err) {
                    console.log(err);
                });

            /*//pills
            $(document).ready(function(){
                $(".nav-tabs a").click(function(){
                    $(this).tab('show');
                });
            });*/

            UserService.getUsers()
                .then(function (res) {
                    $scope.users = res.data;
                })
                .catch(function (err) {
                    console.log(err);
                });

            $timeout(function () {
                for(var i = 0;i< $scope.users.length; i++){
                    for(var x = 0; x < $scope.users[i].results.length; x++){
                        if($scope.users[i].results[x].testName == 'Careers Test'){
                        }else {
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
                        }
                    }
                }
            }, 500);

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

            $scope.cs = 0;
            $scope.ec = 0;
            $scope.ms = 0;
            $scope.bm = 0;
            $scope.ea = 0;

            $timeout(function () {
                for(var i = 0; i< $scope.user.recentlyViewed.length; i++){
                    switch($scope.user.recentlyViewed[i].sector){
                        case 'Computer Science': $scope.cs++;
                            break;
                        case 'Engineering and Construction' : $scope.ec++;
                            break;
                        case 'Medicine and Science' : $scope.ms++;
                            break;
                        case 'Business and Management' : $scope.bm++;
                            break;
                        case 'Education and Arts' : $scope.ea++;
                            break;
                    }
                }
                $scope.data = [$scope.cs, $scope.ec, $scope.ms, $scope.bm, $scope.ea];
            }, 500);

            $scope.labels = ["Computer Science", "Construction & Engineering", "Medicine & Science", "Business & Management", "Arts & Education"];



            $scope.images = [
                './assets/img/1.jpg',
                './assets/img/2.jpg',
                './assets/img/3.jpg'
            ];

            $scope.changeBackground = function () {
                var modalOptions = {
                    closeButtonText:'Cancel',
                    actionButtonText: 'OK',
                    headerText: 'Select a photo'
                };
                profileImageModalService.showModal({}, modalOptions);
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