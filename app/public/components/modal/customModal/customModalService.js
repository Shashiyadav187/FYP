(function(){
    "use strict";

    App.service('customModalService', ['$uibModal',
        function ($uibModal) {

            var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: '/views/customModal.html'
            };

            var modalOptions = {
                closeButtonText:'Back',
                actionButtonText: 'OK',
                headerText: 'Proceed?'
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
                    tempModalDefaults.controller = function ($scope, $uibModalInstance) {
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