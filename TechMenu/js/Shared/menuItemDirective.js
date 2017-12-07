techMenuApp.directive('menuItem',function(){
  return {
    restrict: 'E',
    scope: {
      item: '=',
      modifyMenuItem: '&',
      removeMenuItem: '&',
    },
    templateUrl: "./js/Shared/menuItemTemplate.html",
    controller: function($scope){
      $scope.editing = false;
      $scope.itemCopy = angular.copy($scope.item);

      $scope.changeMenuItem = function(){
        var itemToModify = $scope.itemCopy;
        $scope.modifyMenuItem()(itemToModify)
			  .then(function(success){
				  $scope.finishEdit();
			  }, function(error){
				  $scope.finishEdit();
			  });
      };

      $scope.onEdit = function(){
        $scope.editing = true;
      }

      $scope.finishEdit = function(){
        $scope.editing = false;
      }
      
      $scope.deleteMenuItem = function(){
        var itemToRemove =  $scope.itemCopy;
        $scope.removeMenuItem()(itemToRemove);
      }
    }
  };
});
