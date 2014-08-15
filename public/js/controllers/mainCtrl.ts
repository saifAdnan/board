/// <reference path="../types/angular/angular.d.ts" />
declare var app;

interface IMainCtrl {
    count:number;
    inc:()=>void;
    dec:()=>void;
}

class mainCtrl implements IMainCtrl{

    count: number = 18;
    message: string = 'Test';

    static $inject = ['$scope'];

    constructor($scope) {
        $scope.vm = this;
    }

    inc() {
        this.count++;
    }

    dec() {
        this.count--;
    }
}

app.controller('mainCtrl', mainCtrl);