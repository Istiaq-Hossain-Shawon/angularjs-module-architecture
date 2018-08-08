'use strict';

angular.module('Login').controller('LoginController',
function ($scope, $location, AuthService) {
  $scope.pageName = "Login";

  $scope.loginUser = function(){
    $scope.hasError = false;
    AuthService.login($scope.loginData).then(function (response) {
      console.log(response);
      $location.path('/profile');
    }, function (err) {
      console.log(err);
      $scope.errorMessage = err.error_description;
      $scope.hasError = true;
    });
  }

});
