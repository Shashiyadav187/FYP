(function(){
    "use strict";

    App.service('courseModalService', ['$uibModal',
        function ($uibModal) {

            var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: '/views/courseModal.html'
            };

            var modalOptions = {
                closeButtonText:'Cancel',
                actionButtonText: 'OK',
                course: 'Course Title',
                code: 'Course Code',
                college: 'College Title',
                points: 'Course Points',
                sector: 'Course Sector',
                thesis: 'Thesis Option',
                erasmus: 'Erasmus Option',
                portfolio: 'portfolio',
                placement: 'Placement',
                externalLink: 'External Link',
                duration: 'length',
                comments: 'comments'
            };

            this.showModal = function (customModalDefaults, customModalOptions) {
                if (!customModalDefaults) customModalDefaults = {};
                customModalDefaults.backdrop = 'static';
                return this.show(customModalDefaults, customModalOptions);
            };

            this.show = function (customModalDefaults, customModalOptions) {
                var tempModalDefaults = {};
                var tempModalOptions = {};

                //Map angular-ui modal custom defaults to modal defaults defined in service
                angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

                //Map successModal.html $scope custom properties to defaults defined in service
                angular.extend(tempModalOptions, modalOptions, customModalOptions);

                if (!tempModalDefaults.controller) {
                    tempModalDefaults.controller = function ($scope, $uibModalInstance, UserService, CourseService, $timeout, $http, $interval) {
                        $scope.modalOptions = tempModalOptions;
                        var cid = $scope.modalOptions.code;
                        console.log(cid);
                        $scope.course = null;

/*
                        $interval(function(){
*/
                        CourseService.getCurrentCourse(cid)
                            .then(function (res) {
                                $scope.course = res.data;
                                console.log($scope.course);
                            },function errorCallback(err){
                                console.log(err);
                            });
/*
                        }, 5000);
*/


                        $scope.modalOptions.ok = function (id, comment) {
                            UserService.getCurrentUser()
                                .then(function (res) {
                                    $scope.user = res.data.user;
                                    console.log($scope.user);
                                    $http.post('api/comments', {
                                        text: comment,
                                        user: $scope.user.firstName +' '+ $scope.user.lastName,
                                        course: id,
                                        timeStamp: Date.now()
                                    })
                                        .success(function(data, status, header, config){
                                            if(data.success){
                                                console.log(data);
                                            } else {
                                                console.log("Success :)");
                                                console.log(id+" id");
                                                console.log($scope.user + " user");
                                                console.log(comment+ " comment");
                                                $http.get('api/comments')
                                                    .then(function(response){
                                                            var length = response.data.length-1;
                                                            $scope.commentObject = response.data[length];
                                                            console.log($scope.commentObject);

                                                            $http.post('api/courses/addComment/'+ id,{
                                                                comments: $scope.commentObject
                                                            })
                                                                .success(function(data, status, header, config){
                                                                    if(data.success){
                                                                        console.log(data+" error posting to course response")
                                                                    } else {
                                                                        console.log(data + " Success ---------------- possibly");
                                                                        $uibModalInstance.close()
                                                                    }
                                                                });
                                                        },function errorCallback(err){
                                                            console.log(err);
                                                        }
                                                    );
                                            }
                                        });
                                }, function errorCallback(err) {
                                    console.log('Get user Error ' + err);
                                    $scope.user = null;
                                });
                        };
                        $scope.modalOptions.close = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    }
                }

                return $uibModal.open(tempModalDefaults).result;
            };

        }]);
})();