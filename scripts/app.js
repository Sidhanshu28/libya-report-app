/**
 * Created by hisp on 1/12/15.
 */

var libyaReportApp = angular.module('libyaReportApp', ['ui.bootstrap',
    'ngRoute',
    'ngCookies',
    'ngSanitize',
    'ngMessages',
    'd2HeaderBar',
    'd2Directives',
    'd2Filters',
    'd2Services',
    'pascalprecht.translate',
    'trackerReportsAppServices',
    'selections'
]).controller('DropdownCtrl', function ($scope, $rootScope, MetadataService, util) {


    // weekly
    $rootScope.weekButton = "Select week";
    var year = $rootScope.yearButton;
    var sd = new Date(year, 0, 1);
    var ed = new Date(year, 11, 31);
    $scope.weekActions = [];
    // $scope.weekActions = ["1","2","3"];

    $scope.changeweekText = function (name) {
        $rootScope.weekButton = name;
    }

    //select weekly for ewarn
    $scope.update = function () {
        $rootScope.weekButton = "Select week";
        var year = $rootScope.yearButton;
        var sd = new Date(year, 0, 1);
        var ed = new Date(year, 11, 31);
        $scope.weekActions = util.getweeks(sd, ed);
        // $scope.$apply();
    };


    //select period type
    $rootScope.periodTypeButton = "Select period type";
    $scope.periodTypeActions = [
        "Monthly", "Quarterly", "Six-monthly", "Yearly"
    ];

    $scope.changePeriodTypeText = function (name) {
        $rootScope.periodTypeButton = name;
        if (name == 'Monthly') {
            $('#month').show();
            $('#month').attr("disabled", false);
            $('#sm').hide();
            $('#quarter').hide();
        }
        else if (name == 'Quarterly') {
            $('#quarter').show();
            $('#sm').hide();
            $('#month').hide();
        }
        else if (name == 'Six-monthly') {
            $('#sm').show();
            $('#month').hide();
            $('#quarter').hide();
        }
        else {
            $('#sm').hide();
            $('#month').show();
            $('#month').attr("disabled", true);
            $('#quarter').hide();
        }

    }
    // ewarn select year
    $rootScope.ewarnperiodTypeButton = "Select period";
    $scope.ewarnperiodTypeActions = [
        "Weekly"
    ];

    $scope.changeewarnPeriodTypeText = function (name) {
        $rootScope.ewarnperiodTypeButton = name;
    }

    //select year
    $rootScope.yearButton = "Select year";
    $scope.yearActions = [
        "2018", "2017", "2016"
    ];

    $scope.changeyearText = function (name) {
        $rootScope.yearButton = name;
        $scope.update();
    }

    //select six-monthly
    $rootScope.smButton = "Select period";
    $scope.smActions = [
        "January-June", "July-December"
    ];

    $scope.changesmText = function (name) {
        $rootScope.smButton = name;
    }

    //select quarterly
    $rootScope.quarterButton = "Select quarter";
    $scope.quarterActions = [
        "January-March", "April-June", "June-September", "October-December"
    ];

    $scope.changequarterText = function (name) {
        $rootScope.quarterButton = name;
    }

    //select monthly
    $rootScope.monthButton = "Select month";
    $scope.monthActions = [
        "January", "February", "March", "April", "May", "June", "July", "August", "september", "October", "November", "December"
    ];

    $scope.changemonthText = function (name) {
        $rootScope.monthButton = name;
    }



})

    .config(function ($routeProvider, $translateProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/report.html',
            controller: 'ewarnController'
        }).when('/ewarnreport', {
            templateUrl: 'views/report.html',
            controller: 'ewarnController'
        }).when('/phcreport', {
            templateUrl: 'views/report.html',
            controller: 'phcController'
        }).when('/hospitalreport', {
            templateUrl: 'views/report.html',
            controller: 'hospitalController'
        }).when('/medicalcenterreport', {
            templateUrl: 'views/report.html',
            controller: 'medicalcenterController'
        }).otherwise({
            redirectTo: '/'
        });

        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('escaped');
        $translateProvider.useLoader('i18nLoader');


    });
