'use strict';

angular.module('MyApp.filters').filter("trustHtml", function ($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
});
