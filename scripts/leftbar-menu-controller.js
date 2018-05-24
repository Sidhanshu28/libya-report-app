//Controller for column show/hide
var leftbarModule = angular.module('leftbarModule',['ui.bootstrap'
]).controller('LeftBarMenuController',
    function ($scope,
        $location) {
            
            var loc = $location.$$url;

            if(loc == '/ewarnreport')$scope.reportButton='Ewarn Report'
            else if(loc == '/phcreport')$scope.reportButton='PHC Report'
            else if(loc == '/hospitalreport')$scope.reportButton='Hospital Report'
            else if(loc == '/medicalcenterreport')$scope.reportButton='Medical Center Report'
            else $scope.reportButton='Select Report'

     //       $scope.reportButton = "Select Report";
            $scope.reportActions = [
                "Ewarn Report", "PHC Report", "Hospital Report", "Medical Center Report"
            ];
        
            $scope.changeReportText = function (name) {
               
            
                if(name == "Ewarn Report"){
                    $location.path('/ewarnreport').search();
                    $scope.reportButton = name;
                }
                if(name == "PHC Report"){
                    $location.path('/phcreport').search();
                    $scope.reportButton = name;
                }
                if(name == "Hospital Report"){
                    $location.path('/hospitalreport').search();
                    $scope.reportButton = name;
                }
                if(name == "Medical Center Report"){
                    $location.path('/medicalcenterreport').search();
                    $scope.reportButton = name;
                }
              
            }
    });