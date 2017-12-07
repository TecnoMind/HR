(function() {
'use strict';

    angular
        .module('TechMenuApp')
        .factory('modifyOrderService', modifyOrderService);

    modifyOrderService.$inject = ['orderTotalCalculationService'];

    function modifyOrderService(orderTotalCalculationService) {
        var service = {
            incrementOrderChosenItemQuantity:incrementOrderChosenItemQuantity,
            decrementOrderChosenItemQuantity:decrementOrderChosenItemQuantity
        };
        
        return service;

        function incrementOrderChosenItemQuantity(order, chosenItem) {
                var currentTotal = order.orderTotal;

                chosenItem.quantity++;

                if(chosenItem.dish)
                    order.orderTotal = orderTotalCalculationService.calculateOrderTotal(currentTotal, chosenItem.dish);
                else
                    order.orderTotal = orderTotalCalculationService.calculateOrderTotal(currentTotal, chosenItem.beverage);
         }

         function decrementOrderChosenItemQuantity(order, chosenItem){
                var currentTotal = order.orderTotal;

                if(chosenItem.dish){
                    if(chosenItem.quantity > 1)
                        chosenItem.quantity--;
                    else
                        order.chosenDishes.splice(chosenItem, 1);
                    
                    order.orderTotal = orderTotalCalculationService.removedItemsCalculateOrderTotal(currentTotal, chosenItem.dish);   
                }else{
                    if(chosenItem.quantity > 1)
                        chosenItem.quantity--;
                    else    
                        order.chosenBeverages.splice(chosenItem, 1);
                    
                    order.orderTotal = orderTotalCalculationService.removedItemsCalculateOrderTotal(currentTotal, chosenItem.beverage);
                }
         }
    }
})();