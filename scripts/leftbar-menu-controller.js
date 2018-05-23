//Controller for column show/hide
msfReportsApp.controller('LeftBarMenuController',
    function ($scope,
        $location) {

            $('.dropdown').on( 'click', '.dropdown-menu li a', function() { 
                var target = $(this).html();
             //debugger
               
                //Adds active class to selected item
                $(this).parents('.dropdown-menu').find('li').removeClass('active');
                $(this).parent('li').addClass('active');
         
                //Displays selected text on dropdown-toggle button
                $(this).parents('.dropdown').find('.dropdown-toggle').html(target + ' <span class="caret"></span>');
            });

             
        $scope.ewarnReport = function () {
            $location.path('/ewarnreport').search();
        };
        $scope.phcReport = function () {
            $location.path('/phcreport').search();
        };
        $scope.hospitalReport = function () {
            $location.path('/hospitalreport').search();
        };
        $scope.medicalCenterReport = function () {
            $location.path('/medicalcenterreport').search();
        };


    });