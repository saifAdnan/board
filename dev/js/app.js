/*global angular*/
define([
    'angular',
    'angular-route'
], function(angular, ngRoute) {
    "use strict";

    var app = angular.module('myApp', ['ngRoute']);

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
    app.config([
            '$controllerProvider',
            '$compileProvider',
            '$filterProvider',
            '$provide',
            '$routeProvider',
            '$locationProvider',
            '$interpolateProvider',
            function (
                $controllerProvider,
                $compileProvider,
                $filterProvider,
                $provide,
                $routeProvider,
                $locationProvider,
                $interpolateProvider) {

                app.register = {
                    controller: $controllerProvider.register,
                    directive: $compileProvider.directive,
                    filter: $filterProvider.register,
                    factory: $provide.factory,
                    service: $provide.service
                };

                $interpolateProvider.startSymbol('{%');
                $interpolateProvider.endSymbol('%}');

                $routeProvider
                    .when('/', {
                        templateUrl: './public/partials/home.html',
                        controller: 'mainCtrl',
                        resolve: {
                            load: ['$q', function ($q) {
                                var deferred = $q.defer();
                                require(['js/controllers/mainCtrl'], function () {
                                    deferred.resolve();
                                });
                                return deferred.promise;
                            }]
                        }
                    }, false)
                    .when('/user', {
                        template: '<h1>user</h1>',
                        controller: function () {
                            console.log('from user');
                        }
                    }, false);

                $locationProvider
                    .html5Mode(false)
                    .hashPrefix('!');
            }]
    );

    return app;
});