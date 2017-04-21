(function(){
    "use strict";

    App.service('commentModalService', ['$uibModal',
        function ($uibModal) {

            var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: '/views/commentModal.html'
            };

            var modalOptions = {
                closeButtonText:'Cancel',
                actionButtonText: 'OK',
                headerText: 'Reviews',
                code: 'id',
                sector: 'sector'
            };

            this.showModal = function (customModalDefaults, customModalOptions) {
                if (!customModalDefaults) customModalDefaults = {};
                customModalDefaults.backdrop = 'static';
                return this.show(customModalDefaults, customModalOptions);
            };

            this.show = function (customModalDefaults, customModalOptions) {
                //Create temp objects to work with since we're in a singleton service
                var tempModalDefaults = {};
                var tempModalOptions = {};

                //Map angular-ui modal custom defaults to modal defaults defined in service
                angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

                //Map successModal.html $scope custom properties to defaults defined in service
                angular.extend(tempModalOptions, modalOptions, customModalOptions);

                if (!tempModalDefaults.controller) {
                    tempModalDefaults.controller = function ($scope, $uibModalInstance, CourseService, $http, UserService, $interval) {
                        $scope.modalOptions = tempModalOptions;
                        $scope.modalOptions.ok = function (result) {
                            $uibModalInstance.close(result);
                        };
                        $scope.modalOptions.close = function (result) {
                            $uibModalInstance.dismiss('cancel');
                        };

                        UserService.getCurrentUser()
                            .then(function (res) {
                                $scope.currentUser = res.data.user;
                            })
                            .catch(function (err) {
                                console.log("Error: "+err);
                            });

                        $scope.showComment = false;

                        var id = $scope.modalOptions.code;
                        /*$interval(function () {*/

                            CourseService.getCurrentCourse(id)
                                .then(function (res) {
                                    $scope.course = res.data;
                                    console.log("Course is "+$scope.course);
                                    console.log("Course is "+res.data);
                                })
                                .catch(function (err) {
                                    console.log("Error retrieving course: "+err);
                                });

                       /* }, 5000);*/

                        $scope.addComment = function (body) {
                            $http.post('/api/comments/',{
                                text : body,
                                user: $scope.currentUser,
                                course: $scope.course.course_id
                            }).then(function (res) {
                                $scope.comment = res.data.comment;
                                $http.post('api/courses/addComment/'+ id,{
                                    comments: $scope.comment
                                }).then(function (res) {
                                    console.log("AddComment " , res);
                                })
                                    .catch(function (err) {
                                        console.log("Error ", err);
                                    })
                            })
                                .catch(function (err) {
                                    console.log("Error: "+err);
                                });

                        }
                    }
                }

                return $uibModal.open(tempModalDefaults).result;
            };

        }]);
})();