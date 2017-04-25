(function(){
    "use strict";

    App.service('profileImageModalService', ['$uibModal',
        function ($uibModal) {

            var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: '/views/profileImageModal.html'
            };

            var modalOptions = {
                closeButtonText:'Back',
                actionButtonText: 'OK',
                headerText: 'Select a photo'
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
                    tempModalDefaults.controller = function ($scope, $uibModalInstance, $http, UserService, $state) {
                        $scope.modalOptions = tempModalOptions;
                        $scope.modalOptions.ok = function (result) {
                            $uibModalInstance.close(result);
                        };
                        $scope.modalOptions.close = function (result) {
                            $uibModalInstance.dismiss('cancel');
                        };

                        UserService.getCurrentUser()
                            .then(function(res){
                                $scope.currentUser = res.data.user;
                                console.log("Success---------------");
                            }, function(err){
                                console.log('Error here--------' + err);
                            });

                        $scope.url = null;
                        $scope.title = "";


                        $scope.changeBackground = function () {
                            $scope.url = '/backgroundImages/';
                            $scope.title = "Background";
                        };
                        $scope.changeProfile = function () {
                            $scope.url = '/profileImages/';
                            $scope.title = "Profile";
                        };

                        $scope.fileSelected = function (element) {
                            var file = element.files[0];
                            var storageRef = firebase.storage().ref('users/'+ $scope.currentUser._id + $scope.url + file.name);
                            var state = storageRef.put(file);
                            state.on('state_changed',
                                function progress(snapshot) {
                                },

                                function error(err) {
                                },

                                function complete() {
                                    if($scope.url == '/profileImages/') {
                                        $scope.currentUser.profiler = state.snapshot.downloadURL;
                                        console.log($scope.currentUser.profiler, ': is my new profiler');
                                    } else if($scope.url == '/backgroundImages/') {
                                        $scope.currentUser.backgroundPhoto = state.snapshot.downloadURL;
                                        console.log($scope.currentUser.backgroundPhoto, ': is my new background');
                                    }
                                        //add code to persist the imageUrl to db
                                        $http.post('/api/users/updateUser/' + $scope.currentUser._id, $scope.currentUser)
                                            .then(function (res) {
                                                $scope.user = res.data;
                                                console.log("image updated!");
                                                $uibModalInstance.dismiss();
                                            })
                                            .catch(function (err) {
                                                console.log(err);
                                                $uibModalInstance.dismiss();
                                            });
                                   /* } else if(modalOptions.url = '/backgroundImages/'){
                                        $scope.currentUser.backgroundPhoto = state.snapshot.downloadURL;
                                        console.log($scope.currentUser.backgroundPhoto, ': is my new profiler');
                                        //add code to persist the imageUrl to db
                                        $http.post('/api/users/updateUser/' + $scope.currentUser._id, $scope.currentUser)
                                            .then(function (res) {
                                                $scope.user = res.data;
                                                console.log("image updated!");
                                                $uibModalInstance.dismiss();
                                            })
                                            .catch(function (err) {
                                                console.log(err);
                                                $uibModalInstance.dismiss();
                                            });
                                    }*/

                                }
                            );

                        };
                    }
                }

                return $uibModal.open(tempModalDefaults).result;
            };

        }]);
})();