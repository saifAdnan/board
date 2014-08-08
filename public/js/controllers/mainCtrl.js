(function (app) {
    "use strict";

    var mainCtrl = function ($scope) {
        $scope.hello = "hello world world!!!!";
    };

    mainCtrl.$inject = ['$scope'];

    app.controller('mainCtrl', mainCtrl);

}(app));