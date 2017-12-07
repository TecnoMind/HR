techMenuApp.directive('orderMenuItem',function(){
  return {
    restrict: 'E',
    scope:{
      openedOrder: '=',
      item: '=',
      addOrderedItem:'&'
    },
    templateUrl: './js/Shared/orderMenuItemTemplate.html',
    controller: function($scope){
      //a kind of strong typed language override to the function
      //in the parent scope (OrderController - $scope.AddOrderITEM)
      $scope.addOrderItem = function(){
        var orderedItem = $scope.item;
        $scope.addOrderedItem()(orderedItem);
      };
    }
  };
});
