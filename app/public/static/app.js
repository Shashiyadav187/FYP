(function(){
    "use strict";

    window.App = angular.module('college', [
        'ngAnimate',
        'ngResource',
        'ui.bootstrap',
        'ui.router'
    ])
        .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {
            $locationProvider.html5Mode(false);

            $urlRouterProvider.otherwise( function($injector) {
                var $state = $injector.get("$state");
                $state.go("app.home");
            });
            $stateProvider
                .state('app', {
                    url: '/app',
                    abstract: true,
                    templateUrl: 'views/app.html',
                    controller: 'appController'
                })
                .state('app.home', {
                    url: '/home',
                    templateUrl: 'views/home.html',
                    controller: 'homeController'
                })
                .state('app.error',{
                    url: '404',
                    templateUrl: 'views/404.html'
                })
                .state('app.admin',{
                    url: '/admin',
                    templateUrl: 'views/admin.html',
                    controller: 'adminController'
                })
                .state('login',{
                    url: '/login',
                    controller: 'TopNavbarController',
                    templateUrl: 'views/login.html'
                })
                .state('signup',{
                    url: '/signup',
                    controller: 'SignupController',
                    templateUrl: 'views/signup.html'
                })

        }])
        .run(["$rootScope", "$state", "$stateParams", '$window', '$location',
            function ($rootScope, $state, $stateParams, $window, $location) {

                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
                $rootScope.$storage = $window.localStorage;

                $rootScope.app = {
                    name: 'College Experience',
                    description: 'student website',
                    year: ((new Date()).getFullYear()),
                    version: "v0.0.1",
                    viewAnimation: 'ng-fadeInUp'
                };

            }]);

    var injector = angular.injector(['ng']);
    var $http = injector.get("$http");

    bootstrapApp();

    function bootstrapApp(){
        angular.element(document).ready(function(){
            angular.bootstrap(document, ['college']);
        });
    }
})();