'use strict';

angular.module('MyApp.services').
factory('HttpRequestService', function ($http, $q, ApiEndPoints) {
  var objToReturn = {};
  var _baseUrl = ApiEndPoints.url;

  var _post = function (url, data) {
    var defer = $q.defer();
    $http.post(_baseUrl + url, data).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      return defer.reject(error);
    });
    return defer.promise;
  };
  var _get = function (url) {
    var defer = $q.defer();
    $http.get(_baseUrl + url).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      return defer.reject(error);
    });
    return defer.promise;
  };
  var _delete = function (url, data) {
    var defer = $q.defer();
    $http.delete(_baseUrl + url, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      return defer.reject(error);
    });
    return defer.promise;
  };
  var _put = function (url, data) {
    var defer = $q.defer();
    $http.put(_baseUrl + url, data).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      return defer.reject(error);
    });
    return defer.promise;
  };

  objToReturn.post = _post;
  objToReturn.get = _get;
  objToReturn.delete = _delete;
  objToReturn.put = _put;
  return objToReturn;
});
