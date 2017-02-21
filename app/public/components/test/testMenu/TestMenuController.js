(function(){
    "use strict";

    App.controller('TestMenuController', ['$scope','$state','ModalService',
        function($scope, $state, ModalService) {

            $scope.spatialLink = function() {
                $state.go('app.spatialTest');
            };

            $scope.logicalLink = function() {
                $state.go('app.careersTest');
            };
            $scope.numericalLink = function() {
                $state.go('app.numericalTest');
            };

            $scope.yesNoResult = null;

            $scope.showModal = function() {
                ModalService.showModal({
                    templateUrl: "views/modalConfirm.html",
                    controller: "YesNoController"
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function (result) {
                        $scope.yesNoResult = $state.go('app.spatial');
                    });
                });
            }

        }]);
})();