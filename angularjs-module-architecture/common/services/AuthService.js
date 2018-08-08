'use strict';

angular.module('MyApp.services').factory('AuthService',
function ($http, $q, localStorageService, ApiEndPoints, jwtHelper) {

  var authServiceFactory = {};

  var _authentication = {
    isAuth: false,
    userName: "",
    userId: "",
    useRefreshTokens: false
  };

  var _externalAuthData = {
    provider: "",
    userName: "",
    externalAccessToken: ""
  };

  var _saveRegistration = function (registration) {

    _logOut();

    return $http.post(ApiEndPoints.url + 'accounts/create', registration).then(function (response) {
      return response;
    });

  };

  var _login = function (loginData) {
    // localStorageService.set('authorizationData', { token: "response.access_token", userName: loginData.userName, refreshToken: "response.refresh_token", useRefreshTokens: false });
    // _authentication.isAuth = true;
    // _authentication.userName = loginData.userName;
    // _authentication.useRefreshTokens = loginData.useRefreshTokens;

    loginData.useRefreshTokens = true;
    var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
    if (loginData.useRefreshTokens) {
      data = data + "&client_id=" + ApiEndPoints.clientId;
    }

    var deferred = $q.defer();
    $http.post(ApiEndPoints.url + 'oauth/token', data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function (response) {

      if (loginData.useRefreshTokens) {
        localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, userId: response.userID, refreshToken: response.refresh_token, useRefreshTokens: true });
      }
      else {
        localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, userId: response.userID, refreshToken: "", useRefreshTokens: false });
      }
      _authentication.isAuth = true;
      _authentication.userName = loginData.userName;
      _authentication.useRefreshTokens = loginData.useRefreshTokens;
      _authentication.userId = response.userID;

      deferred.resolve(response);
    }).error(function (err, status) {
      _logOut();
      deferred.reject(err);
    });

    return deferred.promise;
  };

  var _logOut = function () {
    localStorageService.remove('authorizationData');
    _authentication.isAuth = false;
    _authentication.userName = "";
    _authentication.userId = "";
    _authentication.useRefreshTokens = false;
  };

  var _fillAuthData = function () {
    var authData = localStorageService.get('authorizationData');
    if (authData) {
      _authentication.isAuth = true;
      _authentication.userName = authData.userName;
      _authentication.userId = authData.userId;
      _authentication.useRefreshTokens = authData.useRefreshTokens;
    }
  };

  var _refreshToken = function () {
    var deferred = $q.defer();

    var authData = localStorageService.get('authorizationData');

    if (authData) {

      if (authData.useRefreshTokens) {

        var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ApiEndPoints.clientId;

        localStorageService.remove('authorizationData');

        $http.post(ApiEndPoints.url + 'oauth/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
          localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, userId: response.userID, refreshToken: response.refresh_token, useRefreshTokens: true });
          deferred.resolve(response);
        }).error(function (err, status) {
          _logOut();
          deferred.reject(err);
        });
      }
    }
    return deferred.promise;
  };

  var _obtainAccessToken = function (externalData) {

    var deferred = $q.defer();

    $http.get(ApiEndPoints.url + 'account/external/ObtainLocalAccessToken', { params: { provider: externalData.provider, clientID: ApiEndPoints.clientId,externalAccessToken: externalData.externalAccessToken } }).success(function (response) {

      localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

      _authentication.isAuth = true;
      _authentication.userName = response.userName;
      _authentication.useRefreshTokens = false;

      deferred.resolve(response);

    }).error(function (err, status) {
      _logOut();
      deferred.reject(err);
    });

    return deferred.promise;
  };

  var _registerExternal = function (registerExternalData) {

    var deferred = $q.defer();

    $http.post(ApiEndPoints.url + 'account/external/Register', registerExternalData).success(function (response) {

      localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

      _authentication.isAuth = true;
      _authentication.userName = response.userName;
      _authentication.useRefreshTokens = false;

      deferred.resolve(response);

    }).error(function (err, status) {
      _logOut();
      deferred.reject(err);
    });

    return deferred.promise;

  };

  var _decodeToken = function(){
    var authData = localStorageService.get('authorizationData');
    return authData ? jwtHelper.decodeToken(authData.token) : null;
  };
  var _isTokenExpired = function(){
    var authData = localStorageService.get('authorizationData');
    return authData ? jwtHelper.isTokenExpired(authData.token) : null;
  };
  var _getTokenExpirationDate = function(){
    var authData = localStorageService.get('authorizationData');
    return authData ? jwtHelper.getTokenExpirationDate(authData.token) : null;
  };
  var _isRoleExist = function(roleName){
    var token = _decodeToken();
    if(!token) {
      return null;
    }
    token.role = typeof token.role === "string" ? [token.role] : token.role;
    return token.role.some(obj => obj.toLowerCase() == roleName.toLowerCase());
  };

  authServiceFactory.saveRegistration = _saveRegistration;
  authServiceFactory.login = _login;
  authServiceFactory.logOut = _logOut;
  authServiceFactory.fillAuthData = _fillAuthData;
  authServiceFactory.authentication = _authentication;
  authServiceFactory.refreshToken = _refreshToken;

  authServiceFactory.obtainAccessToken = _obtainAccessToken;
  authServiceFactory.externalAuthData = _externalAuthData;
  authServiceFactory.registerExternal = _registerExternal;

  authServiceFactory.decodeToken = _decodeToken;
  authServiceFactory.isTokenExpired = _isTokenExpired;
  authServiceFactory.getTokenExpirationDate = _getTokenExpirationDate;
  authServiceFactory.isRoleExist = _isRoleExist;

  return authServiceFactory;
});
