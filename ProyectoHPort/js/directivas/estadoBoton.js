app.directive('estadoBoton', function() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'js/directivas/estadoBoton.html',
    
    link: function(scope, element, attrs) {
      scope.buttonText = "Informacion",
      scope.mostrando = false,

      scope.estado = function() {
        element.toggleClass('btn-active')
        if(scope.mostrando) {
          scope.buttonText = "Informacion";
          scope.mostrando = false;
        } else {
          scope.buttonText = "Ocultar";
          scope.mostrando = true;
        }
      }
    }

    
  };
});