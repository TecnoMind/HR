(function() {
'use strict';

    angular
        .module('TechMenuApp')
        .service('orderService', orderService);

    orderService.$inject = ['$http','$q','serverUrl'];
    
    function orderService($http, $q, serverUrl) {
        
        this.promise;
        this.saveOrder = saveOrder;
        this.getOrders = getOrders;
        
        function getOrders(){
            if(!this.promise)
                this.promise = fetchOrdersFromAPI();

            return this.promise;
         };

        function fetchOrdersFromAPI(){

            var promise = $http.get(serverUrl+'/api/order')
                .then(function(response){
                    return response.data;
            }, function(error){
                return error;
            });

            return promise;
        }
  
        function saveOrder(order){
            
            var orderRequestObject = buildValidOrderObject(order);
            
            return sendOrderToServer(orderRequestObject);
            
        } 
        
        function buildValidOrderObject(order){
            var orderRequestObject = {
                clientName: order.clientName,
                chosenDishes: [],
                chosenBeverages: []
            };
            
            order.orderItems.forEach(function(orderItem) {
                 
                 if(orderItem.itemType === 'Platillo'){
                    var dishItem = {
                        dishId : orderItem.id,
                        quantity: orderItem.quantity
                    };
                    
                    orderRequestObject.chosenDishes.push(dishItem);
                 }else{
                     var beverageItem = {
                         beverageId : orderItem.id,
                         quantity: orderItem.quantity
                     };
                     
                     orderRequestObject.chosenBeverages.push(beverageItem);
                 }
                 
            }, this);
            
            return orderRequestObject;

        }  
        
        function sendOrderToServer(orderRequestObject){
            var deferred = $q.defer();
            
            $http({
               url: serverUrl+'/api/Order/AddOrder',
               method: 'POST',
               data : orderRequestObject
            }).then(function(success){
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            });
            
            return deferred.promise;
        }  
    }
})();