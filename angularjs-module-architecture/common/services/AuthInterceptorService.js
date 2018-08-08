'use strict';
angular.module('MyApp.services').factory('AuthInterceptorService',
function ($q, $injector, $location, localStorageService) {

  var authInterceptorServiceFactory = {};

  var _request = function (config) {

    config.headers = config.headers || {};

    var authData = localStorageService.get('authorizationData');
    if (authData) {
      config.headers.Authorization = 'Bearer ' + authData.token;

      var authService = $injector.get('AuthService');
      if(authData.useRefreshTokens && authService.isTokenExpired()){
        return authService.refreshToken().then(function(data){
          console.log(data);
          authData = localStorageService.get('authorizationData');
          config.headers.Authorization = 'Bearer ' + authData.token;
          return config;
        }, function(error){
          console.log(error);
          return config;
        });
      }
    }

    return config;
  }

  var _responseError = function (rejection) {
    if (rejection.status === 401) {
      var authService = $injector.get('AuthService');
      var authData = localStorageService.get('authorizationData');

      if (authData) {
        if (authData.useRefreshTokens) {
          $location.path('/refresh');
          return $q.reject(rejection);
        }
      }
      authService.logOut();
      $location.path('/login');
    }
    return $q.reject(rejection);
  }

  authInterceptorServiceFactory.request = _request;
  authInterceptorServiceFactory.responseError = _responseError;

  return authInterceptorServiceFactory;
});
