(function(){
    "use strict";

    App.service('ChatModalService', ['$uibModal',
        function ($uibModal) {

            var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: '/views/chatModal.html'
            };

            var modalOptions = {
                headerText: 'Select a user to chat with',
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
                    tempModalDefaults.controller = function ($scope, $uibModalInstance, UserService, $state, $http) {
                        UserService.getCurrentUser()
                            .then(function (res) {
                                $scope.currentUser = res.data.user;
                                console.log($scope.currentUser);
                            }, function (err) {
                                console.log('Get user Error ' + err);
                                $scope.currentUser = null;
                            });

                        UserService.getUsers()
                            .then(function (res) {
                                $scope.users = res.data;
                                console.log($scope.users+" users");
                            }).catch(function (err) {
                            console.log(err+" err");
                        });

                        $scope.chatTo =function (user) {
                            console.log(user._id+" _id");
                            $state.go('app.chat',{
                                id : user._id
                            });
                                $http.post('/api/notifications/',{
                                    senderId: $scope.currentUser._id,
                                    receiverId: user._id,
                                    timeStamp: Date.now(),
                                    message: $scope.currentUser.firstName+" "+
                                        $scope.currentUser.lastName+" has sent you a chat request",
                                    seen: false
                                }).then(function (res) {
                                    console.log("Success "+res);
                                }).catch(function (err) {
                                    console.log("Failed: "+err);
                                });
                            $uibModalInstance.close();
                        };

                        $scope.modalOptions = tempModalOptions;
                        $scope.modalOptions.ok = function (result) {
                            $uibModalInstance.close(result);
                        };
                        $scope.modalOptions.close = function (result) {
                            $uibModalInstance.dismiss('cancel');
                        };
                    }
                }

                return $uibModal.open(tempModalDefaults).result;
            };

        }]);
})();