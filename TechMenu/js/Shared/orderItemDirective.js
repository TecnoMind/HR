techMenuApp.directive('orderItem',function(){
  return {
    restrict: 'E',
    scope: {
      index: '=',
      order: '=',
      incrementQuantity: '&',
      decrementQuantity: '&',
      viewOrderItemsList: '&',
      dispatchOrder: '&',
      cancelOrder: '&'
    },
    templateUrl: "./js/Shared/orderItemTemplate.html"
  };
});
