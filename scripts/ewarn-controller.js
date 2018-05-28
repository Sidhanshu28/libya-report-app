/**
 * Created by sidhanshu on 24/05/18.
 */

libyaReportApp
  .controller('ewarnController', function ($rootScope,
    $scope,
    $timeout,
    MetadataService) {


    var def = $.Deferred();

    $scope.select = 'ewarn';


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


    $scope.submit = function () {

      var ou = $scope.selectedOrgUnitUid[0];
      var ds = DATASET_ID_EWARN_REPORT;
      var pe = getPeriod($rootScope.periodTypeButton);
      $("#ewarnTable table").remove();
      MetadataService.getHTMLfromDataset(ds, ou, pe).then(function (response) {
        $("#ewarnTable").append('<br>' + response);
        //   $("table").setAttribute("");
        $("#ewarnTable table").removeAttr("style");
        $("#ewarnTable table tr td span span").removeAttr("style");
        $("#ewarnTable table tr td span").removeAttr("style");
        $("#ewarnTable table tr td").removeAttr("style");
        $("#ewarnTable table tr").removeAttr("style");
        $("#ewarnTable table").addClass("table table-bordered table-hover");

        $("#ewarnTable table tr").each(function (index) {
          var sum = 0;
          var flag = false;
          $(this).find(".et16").each(function (cellindex) {
            flag = true;
            var value = 0;
            if ($(this)[0].innerText == "") {
              value = 0;
            }
            else {
              value = parseInt($(this)[0].innerText);
            }
            sum = sum + value;
          });


          if (flag) {
            if ($(this)[0].childElementCount < 5 && index != 3) {
              var cell = "<td></td>";
            $(this).prepend(cell);
            } else {
              var cell = "<td>" + sum + "</td>";
              $(this).prepend(cell);
            }
          }
          else if (!flag && $(this)[0].childElementCount < 5 && index != 3) {
           var cell = "<td></td>";
            $(this).prepend(cell);
          }
          else if (!flag && index == 3) {
            var cell = "<td><b>Sum</b>   </td>";
            $(this).prepend(cell);
          }
          else {
            var cell = "<td></td>";
            $(this).prepend(cell);
          }


        });

      });

    };

  });
