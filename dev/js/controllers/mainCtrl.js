define(['js/app'], function (app) {
    return app.register.controller('mainCtrl', ['$scope', function ($scope) {
        $scope.count = 20;
        $scope.message = "test";

        $scope.inc = function () {
            console.log(0);
            $scope.count++;
        };

        $scope.dec = function () {
            $scope.count--;
        }
    }]);
});