/* Angle Template Code */
(function(){
    App.controller('appController',['$rootScope','UserService',
        function($rootScope, UserService) {
            // Setup the layout mode
            
            // Hook not found
            $rootScope.$on('$stateNotFound',
                function(event, unfoundState) {
                    console.log(unfoundState.to); // "lazy.state"
                    console.log(unfoundState.toParams); // {a:1, b:2}
                    console.log(unfoundState.options); // {inherit:false} + default options
                });
            // Hook error
            $rootScope.$on('$stateChangeError',
                function(event, toState, toParams, fromState, fromParams, error){
                    console.log(error);
                });

            UserService.getCurrentUser()
                .then(function (res) {
                    //console.log("inside appController ");
                    $rootScope.currentUser = res.data.user;
                }, function (err) {
                    console.log('Get user Error ' + err);
                    $rootScope.user = null;
                })

        }]);
})();