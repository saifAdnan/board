/// <reference path="../types/angular/angular.d.ts" />

var mainCtrl = (function () {
    function mainCtrl($scope) {
        this.count = 18;
        this.message = 'Test';
        $scope.vm = this;
    }
    mainCtrl.prototype.inc = function () {
        this.count++;
    };

    mainCtrl.prototype.dec = function () {
        this.count--;
    };
    mainCtrl.$inject = ['$scope'];
    return mainCtrl;
})();

app.controller('mainCtrl', mainCtrl);
//# sourceMappingURL=mainCtrl.js.map
