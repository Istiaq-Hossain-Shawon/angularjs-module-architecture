
angular.module('MyApp.directives', []);
angular.module('MyApp.filters', []);
angular.module('MyApp.services', []);
angular.module('MyApp.configs', []);
angular.module('MyApp.components', []);
angular.module('MyApp.models', []);

angular.module('Dashboard', []);
angular.module('Profile', []);
angular.module('Login', []);
angular.module('Base', [
  'Dashboard',
  'Profile',
  'Login'
]);

var myApp = angular.module('MyApp', [
  'MyApp.directives',
  'MyApp.filters',
  'MyApp.services',
  'MyApp.configs',
  'MyApp.components',
  'MyApp.models',
  'Base',
  'ngRoute',
  'ngCookies',
  'ngResource',
  'angular-loading-bar',
  'ngAnimate',
  'LocalStorageModule',
  'bsLoadingOverlay',
  'angular-jwt'
]);

myApp.controller('NavCtrl', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {
  $scope.isActive = function (item) {
    return $location.path().indexOf(item) != -1;
  };

  $scope.logOut = function () {
    AuthService.logOut();
    $location.path('/login');
  }

  $scope.authentication = AuthService.authentication;
}]);

myApp.run(['AuthService', '$rootScope', '$location', function (AuthService, $rootScope, $location) {
  AuthService.fillAuthData();

  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if(!AuthService.authentication.isAuth && next.requireLogin) {
      $location.path('/login');
    }
  });
}]);


myApp.config(function ($routeProvider, $httpProvider) {
  'use strict';

  $httpProvider.interceptors.push('AuthInterceptorService');

  $routeProvider
  .when('/login', {
    controller: 'LoginController',
    templateUrl: 'module/login/login.html'
  })
  .when('/profile', {
    controller: 'ProfileController',
    templateUrl: 'module/profile/profile.html',
    requireLogin : true
  })
  .when('/dashboard', {
    controller: 'DashboardController',
    templateUrl: 'module/dashboard/dashboard.html'
  })
  .otherwise({redirectTo: '/login'});
});
