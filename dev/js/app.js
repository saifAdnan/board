/*global angular*/
define([
    'angular',
    'angular-route'
], function(angular, ngRoute) {
    "use strict";
    var app = angular.module('myApp', ['ngRoute'], ['$interpolateProvider',
            function ($interpolateProvider) {
                $interpolateProvider.startSymbol('{%');
                $interpolateProvider.endSymbol('%}');
            }]
    );

    app.init = function () {
        angular.bootstrap(document, ['myApp']);
    };

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
                        templateUrl: './public/partials/home.html',
                        controller: function () {
                            console.log('hello');
                        }
                    });

                $locationProvider
                    .html5Mode(false)
                    .hashPrefix('!');
            }]
    );

    return app;
});