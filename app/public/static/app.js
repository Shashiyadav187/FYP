(function(){
    "use strict";

    window.App = angular.module('college', [
        'ngAnimate',
        'ngResource',
        'ui.bootstrap',
        'ui.router',
        'ng-backstretch',
        'chart.js',
        'angular-loading-bar',
        'angularUtils.directives.dirPagination'
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
                    controller: 'LoginController',
                    templateUrl: 'views/login.html'
                })
                .state('signup',{
                    url: '/signup',
                    controller: 'SignupController',
                    templateUrl: 'views/signup.html'
                })
                .state('app.testMenu',{
                    url: '/testMenu',
                    controller: 'TestMenuController',
                    templateUrl: 'views/testMenu.html'
                })
                .state('app.spatialTest',{
                    url: '/spatialTest',
                    controller: 'SpatialTestController',
                    templateUrl: 'views/testTemplate.html'
                })
                .state('app.careersTest',{
                    url: '/careersTest',
                    controller: 'CareersTestController',
                    templateUrl: 'views/testTemplate.html'
                })
                .state('app.numericalTest',{
                    url: '/numericalTest',
                    controller: 'NumericalTestController',
                    templateUrl: 'views/testTemplate.html'
                })
                .state('app.results',{
                    url: '/results/:sectorsArray/:graphData',
                    controller: 'ResultsController',
                    templateUrl: 'views/results.html',
                    params:{
                        'sectorsArray': ''
                    }
                })
                .state('app.profile', {
                    url: '/profile',
                    controller: 'ProfileController',
                    templateUrl: 'views/profile.html'
                })
                .state('app.courses', {
                    url: '/courses',
                    controller: 'CoursesController',
                    templateUrl: 'views/courses.html'
                })
                .state('app.msTest', {
                    url: '/msTest',
                    controller: 'MSTestController',
                    templateUrl: 'views/testTemplate.html'
                })
                .state('app.ecTest', {
                    url: '/ecTest',
                    controller: 'ECTestController',
                    templateUrl: 'views/testTemplate.html'
                })
                .state('app.definedCourses',{
                    url: '/definedCourses/:sectorName',
                    controller: 'DefinedCoursesController',
                    templateUrl: 'views/definedCourses.html',
                    params:{
                        'sectorName': ''
                    }
                })


        }])
        .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider){
            cfpLoadingBarProvider.includeSpinner = false;
            cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
            cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner fa-3x"></div>';
        }])
        .run(["$rootScope", "$state", "$stateParams", '$window',
            function ($rootScope, $state, $stateParams, $window) {

                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
                $rootScope.$storage = $window.localStorage;

                $rootScope.app = {
                    name: 'UnisEx',
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