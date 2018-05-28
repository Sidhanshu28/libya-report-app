/**
 * Created by sidhanshu on 24/05/18.
 */

libyaReportApp
  .controller('medicalcenterController', function ($rootScope,
    $scope,
    $timeout,
    MetadataService) {


    var def = $.Deferred();

    $scope.select = 'medicalcenter';


    $timeout(function () {
      $scope.date = {};
      $scope.date.startDate = new Date();
      $scope.date.endDate = new Date();
    }, 0);

    //initially load tree
    selection.load();

    // Listen for OU changes
    selection.setListenerFunction(function () {
      $scope.selectedOrgUnitUid = selection.getSelected();
      loadPrograms();
    }, false);

    loadPrograms = function () {
      MetadataService.getOrgUnit($scope.selectedOrgUnitUid).then(function (orgUnit) {
        $timeout(function () {
          $scope.selectedOrgUnit = orgUnit;
        });
      });
    }


    function download(text, name, type) {
      var a = document.createElement("a");
      var file = new Blob([text], { type: type });
      a.href = URL.createObjectURL(file);
      a.download = name;
      a.click();
    }


    $scope.fnExcelReport = function () {

      var blob = new Blob([document.getElementById('divId').innerHTML], {
        type: 'text/plain;charset=utf-8'
      });
      saveAs(blob, "Report.xls");

    };


   

  });
