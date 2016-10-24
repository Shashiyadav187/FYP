/* Angle Template Code */
(function(){
    "use strict";
    App.controller('appController',['$rootScope', '$scope', '$state', '$window', '$timeout', '$location',
        function($rootScope, $scope, $state, $window, $timeout, $location) {
            // Setup the layout mode
            
            // Hook not found
            $rootScope.$on('$stateNotFound',
                function(event, unfoundState, fromState, fromParams) {
                    console.log(unfoundState.to); // "lazy.state"
                    console.log(unfoundState.toParams); // {a:1, b:2}
                    console.log(unfoundState.options); // {inherit:false} + default options
                });
            // Hook error
            $rootScope.$on('$stateChangeError',
                function(event, toState, toParams, fromState, fromParams, error){
                    console.log(error);
                });


        }]);
})();