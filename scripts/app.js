/**
 * Created by hisp on 1/12/15.
 */

var msfReportsApp = angular.module('msfReportsApp',['ui.bootstrap',
    'ngRoute',
    'ngCookies',
    'ngSanitize',
    'ngMessages',
    'd2HeaderBar',
    'd2Directives',
    'd2Filters',
    'd2Services',
    'pascalprecht.translate',
    'trackerReportsAppServices'
])

.config(function($routeProvider,$translateProvider){
        $routeProvider.when('/', {
            templateUrl:'views/report.html',
            controller: 'ewarnController'
        }).when('/ewarnreport', {
            templateUrl:'views/report.html',
            controller: 'ewarnController'
        }).when('/phcreport', {
            templateUrl:'views/report.html',
            controller: 'phcController'
        }).when('/hospitalreport', {
            templateUrl:'views/report.html',
            controller: 'hospitalController'
        }).when('/medicalcenterreport', {
            templateUrl:'views/report.html',
            controller: 'medicalcenterController'
        }).otherwise({
            redirectTo : '/'
        });

        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('escaped');
        $translateProvider.useLoader('i18nLoader');


});
