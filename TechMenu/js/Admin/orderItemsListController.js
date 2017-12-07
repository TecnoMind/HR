(function() {
'use strict';

    angular
        .module('TechMenuApp')
        .controller('OrderItemsListController', OrderItemsListController);

    OrderItemsListController.$inject = ['$scope','$stateParams', 'orderService', '$state'];

    function OrderItemsListController($scope, $stateParams, orderService, $state) {
        $scope.order;
        
        $scope.goToItemDetails = function(item){
            if(item.dish){
                $state.go('admin.orderManage.orderItemDetails', {idOrden:$scope.order.id, idItem: item.dish.id, order:$scope.order, item:item});
            }else{
                $state.go('admin.orderManage.orderItemDetails', {idOrden:$scope.order.id, idItem: item.beverage.id, order:$scope.order, item:item});
            }
        }

        loadOrderItem();

        function loadOrderItem(){
            orderService.getOrders()
                .then(function(response){
                    var orderId = $stateParams.idOrden;
                    
                    $scope.order = _.find(response, function(order){
                        return order.id == orderId;
                    });
                
                }, function(error){
                    return null;
                });
        }
    }
})();