techMenuApp.service('orderTotalCalculationService', function(){
    
   this.calculateOrderTotal = function(currentOrderTotal, addedOrderItem){
        return currentOrderTotal + addedOrderItem.price;
   };

   this.removedItemsCalculateOrderTotal = function(currentOrderTotal, removedOrderItem){
        return currentOrderTotal - removedOrderItem.price;
   }
});
