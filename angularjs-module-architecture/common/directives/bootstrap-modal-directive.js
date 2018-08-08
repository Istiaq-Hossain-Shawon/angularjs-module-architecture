
angular.module('MyApp.directives').directive('bootstrapModal', function () {
    return {
      templateUrl: 'templates/bootstrap-modal-directive.html',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function (scope, $element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          $element.modal(value ? 'show' : 'hide');
        });

        $element.on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $element.on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });
