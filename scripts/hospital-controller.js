/**
 * Created by hisp on 2/12/15.
 */
libyaReportApp.directive('calendar', function () {
  return {
    require: 'ngModel',
    link: function (scope, el, attr, ngModel) {
      $(el).datepicker({
        dateFormat: 'yy-mm-dd',
        onSelect: function (dateText) {
          scope.$apply(function () {
            ngModel.$setViewValue(dateText);
          });
        }
      });
    }
  };
});
libyaReportApp
  .controller('hospitalController', function ($rootScope,
    $scope,
    $timeout,
    MetadataService) {
      $scope.select = 'hospital';
    var def = $.Deferred();
    //MSF
  
    $timeout(function () {
      $scope.date = {};
      $scope.date.startDate = new Date();
      $scope.date.endDate = new Date();
    }, 0);

    //initially load tree
    selection.load();

    getAllPrograms();
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

    $scope.selectedProgram = {};
    function getAllPrograms() {
      MetadataService.getAllPrograms().then(function (prog) {
        $scope.allPrograms = prog.programs;
        $scope.programs = [];
        for (var i = 0; i < prog.programs.length; i++) {
          if (prog.programs[i].withoutRegistration == false) {
            $scope.programs.push(prog.programs[i]);
          }
        }
      });
    }


    var psArray = [];



    $scope.loadProgramStages = function (response) {
      psArray = [];
      for (var i = 0; i < response.programStages.length; i++) {
        psArray[response.programStages[i].id] = response.programStages[i].name;
      }
      $scope.program = response;
    };

    $scope.updateStartDate = function (startdate) {
      var date = startdate;
      var output = date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
      $scope.startdateSelected = output;
      //  alert("$scope.startdateSelected---"+$scope.startdateSelected);
    };

    $scope.updateEndDate = function (enddate) {
      var date = enddate;
      var output = date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
      $scope.enddateSelected = output;
      //  alert("$scope.enddateSelected---"+ $scope.enddateSelected);
    };

    $scope.fnExcelReport = function () {

      var blob = new Blob([document.getElementById('divId').innerHTML], {
        type: 'text/plain;charset=utf-8'
      });
      saveAs(blob, "Tracker events report.xls");

    };

  });
