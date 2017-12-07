app.directive('fotoInfo', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=', 
     
    }, 
     link: function (scope,
      element,attrs){
          console.log(scope)
      },
    templateUrl: 'js/directivas/fotosInfo.html' 
  }; 
});