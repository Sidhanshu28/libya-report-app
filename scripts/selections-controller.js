//Controller for column show/hide
var selections = angular.module('selections', ['ui.bootstrap'
]).controller('selectionsController',
    function ($scope,
        $location,MetadataService) {
            $scope.full=true;
           $scope.change = function(val){
            if(val == '1'){
                $scope.full=true;
                $scope.ds=false;
               }
               if(val == '2'){
                $scope.ds=true;
                $scope.full=false; 
               }
           };
            var loc = $location.$$url;

            if (loc == '/ewarnreport') $scope.reportButton = 'Ewarn Report'
            else if (loc == '/phcreport') $scope.reportButton = 'PHC Report'
            else if (loc == '/hospitalreport') $scope.reportButton = 'Hospital Report'
            else if (loc == '/medicalcenterreport') $scope.reportButton = 'Medical Center'
            else $scope.reportButton = 'Select Report'
    
            //       $scope.reportButton = "Select Report";
            $scope.reportActions = [
                "Ewarn Report", "PHC Report", "Hospital Report", "Medical Center"
            ];
    
            $scope.changeReportText = function (name) {
    
    
                if (name == "Ewarn Report") {
                    $location.path('/ewarnreport').search();
                    $scope.reportButton = name;
                }
                if (name == "PHC Report") {
                    $location.path('/phcreport').search();
                    $scope.reportButton = name;
                }
                if (name == "Hospital Report") {
                    $location.path('/hospitalreport').search();
                    $scope.reportButton = name;
                }
                if (name == "Medical Center") {
                    $location.path('/medicalcenterreport').search();
                    $scope.reportButton = name;
                }
    
            }
            $scope.datasetActions = [];
            $scope.datasetButton = 'Select Datasets';
            MetadataService.getDatasets().then(function (data) {
                var datasets = data.dataSets;
                for (var i = 0; i < datasets.length; i++) {
                    if (datasets[i].attributeValues.length != 0) {
                        var attr = datasets[i].attributeValues;
                        for (var j = 0; j < attr.length; j++) {
                            if(attr[j].attribute.name == 'Report app' && attr[j].value == 'true'){
                                for(var k = 0; k < attr.length; k++){
                                    if(attr[k].attribute.name != 'Report app' && attr[k].value == 'true'){
                                      // if(attr[k].attribute.name == $scope.reportButton){
                                            var obj = {'name': datasets[i].name, 'type': attr[k].attribute.name};
                                            $scope.datasetActions.push(obj);
                                      // }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            $scope.changeDatasetText = function (name) {
                $scope.datasetButton = name;
            };
        
    });