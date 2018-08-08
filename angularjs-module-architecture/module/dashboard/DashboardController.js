'use strict';

angular.module('Dashboard').controller('DashboardController',
function ($scope, $timeout, bsLoadingOverlayService) {
  $scope.pageName = 'Dashboard';

  $scope.showModal = function(){
    $scope.isModalShow = true;
  }

  $scope.showLoader = function(){
    bsLoadingOverlayService.start();
    $timeout(function(){
      bsLoadingOverlayService.stop();
    }, 3000);
    $scope.isModalShow = false;
  }
  
});
