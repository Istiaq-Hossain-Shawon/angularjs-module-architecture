
angular.module('MyApp.directives').directive('formActionFooter',
function () {
  return {
    templateUrl: 'templates/form-action-footer-directive.html',
    restrict: 'E',
    transclude: true,
    replace:true,
    scope: {
      cancelText: '@',
      cancelHref: '@',
      submitText: '@',
      isSubmitEnable: '='
    },
    link: function (scope, $element, attrs) {
      // console.log(scope, attrs);
    }
  };
});
