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

      MetadataService.getHTMLfromDataset(ds, ou,pe).then(function (response) {
        $("#print").append(response);
     //   $("table").setAttribute("");
        $("table").removeAttr("style");
        $("table tr td span span").removeAttr("style");
        $("table tr td span").removeAttr("style");
        $("table tr td").removeAttr("style");
        $("table tr").removeAttr("style");
        $("table").addClass("table table-bordered table-hover");

        $("table tr").each(function (index) {
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
              var col = $(this)[0].lastElementChild.colSpan;
              $(this)[0].lastElementChild.colSpan = col + 1;
            } else {
              var cell = "<td style='width:50px'>" + sum + "</td>";
              $(this).append(cell);
            }
          }
          else if (!flag && $(this)[0].childElementCount < 5 && index != 3) {
            var col = $(this)[0].lastElementChild.colSpan;
            $(this)[0].lastElementChild.colSpan = col + 1;
          }
          else if (!flag && index == 3) {
            var cell = "<td style='width:50px'><b>Sum</b>   </td>";
            $(this).append(cell);
          }
          else {
            var cell = "<td style='width:50px'></td>";
            $(this).append(cell);
          }


        });
      });

    };

  });
