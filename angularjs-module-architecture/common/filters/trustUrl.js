'use strict';

angular.module('MyApp.filters').filter("trustUrl", function ($sce) {
    return function (recordingUrl) {
        return $sce.trustAsResourceUrl(recordingUrl);
    };
});
