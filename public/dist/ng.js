var app=function(){"use strict";return app=angular.module("myApp",["ngRoute"],["$interpolateProvider",function(a){a.startSymbol("{%"),a.endSymbol("%}")}]),app.run(["$rootScope",function(a){a.hello="Hello World"}]),app.config(["$routeProvider","$locationProvider",function(a,b){a.when("/",{templateUrl:"public/partials/home.html",controller:"mainCtrl"}),b.html5Mode(!1).hashPrefix("!")}]),app}(),mainCtrl=function(){function a(a){this.count=18,this.message="Test",a.vm=this}return a.prototype.inc=function(){this.count++},a.prototype.dec=function(){this.count--},a.$inject=["$scope"],a}();app.controller("mainCtrl",mainCtrl);