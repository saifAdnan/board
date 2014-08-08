/*global angular*/
var app = (function () {
    "use strict";

    app = angular.module('myApp', ['ngRoute'], ['$interpolateProvider',
        function ($interpolateProvider) {
            $interpolateProvider.startSymbol('{%');
            $interpolateProvider.endSymbol('%}');
        }]
        );

    //app run
    app.run(['$rootScope',
        function ($rootScope) {
            // code
            $rootScope.hello = "Hello World";
        }]
        );

    //Route config
    app.config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'public/partials/home.html',
                    controller: 'mainCtrl'
                });

            $locationProvider
                .html5Mode(false)
                .hashPrefix('!');
        }]
        );

    return app;
}());