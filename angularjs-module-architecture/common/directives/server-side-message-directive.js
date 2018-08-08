
angular.module('MyApp.directives').directive('serverSideMessage',
function () {
  return {
    template: '<div class="{{message.detail.bootstrapClass}}" ng-show="message.isShow">'
    + '<div ng-bind-html="message.message"></div>'
    + '</div>',
    restrict: 'E',
    transclude: false,
    replace:true,
    scope: {
      message: '='
    },
    link: function (scope, $element, attrs) {
      // console.log(scope.message, attrs.message);
      // attrs.$observe('message', function (newValue) {
      //   console.log(newValue);
      // });
    }
  };
});
