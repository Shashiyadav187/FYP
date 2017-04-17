(function(){
    App.controller('ProfileController',['$scope', '$state','UserService','$timeout','$window',
        function($scope, $state, UserService, $timeout, $window){

            $scope.user = null;
            $scope.results = false;
            $scope.coursesTab = false;

            //dropdown
            /*$(document).ready(function(){
                $(".dropdown-toggle").dropdown();
            });*/

            //pills
            $(document).ready(function(){
                $(".nav-tabs a").click(function(){
                    $(this).tab('show');
                });
            });

            $scope.top = "Profile Page";


            UserService.getCurrentUser()
                .then(function(res){
                    $scope.user = res.data.user;
                    console.log("Success---------------");
                }, function(err){
                    console.log('Error here--------' + err);
                });

            $scope.showResults = function(){
                $scope.results = true;
                $scope.coursesTab = false;
            };
            $scope.showCourses = function(){
                $scope.coursesTab = true;
                $scope.results = false;
            };

            $scope.images = [
                './assets/img/1.jpg',
                './assets/img/2.jpg',
                './assets/img/3.jpg'
            ];

            $scope.removeFromDB = function(result){
                var index = $scope.user.results.indexOf(result);
                console.log(index);
                console.log($scope.user.results[index]);
                delete $scope.user.results[index];

                UserService.updateUser($scope.user)
                    .then(function (res) {
                        $scope.user = res.data;
                            console.log("Success "+$scope.user);
                    }, function (err) {
                        console.log(err);
                    })
            };
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