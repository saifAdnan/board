/**
 * Company PrivatBank
 * Project Privat24 payment
 * Author Saif Adnan
 * Email saif.mowefak@gmail.com
 * Date 10/27/14
 * Summary
 */
require.config({
    baseUrl: 'public/',
    paths: {
        'angular': 'lib/angular/angular.min',
        'angular-route': 'lib/angular-route/angular-route.min'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        }
    }
});

require(['js/app'], function (app) {
    app.init();
});