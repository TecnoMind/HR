techMenuApp.controller('OrderManageController', ['$scope', 'orderService','notificationService', 'SweetAlert', 'toastr', '$state',
'modifyOrderService', function ($scope, orderService, notificationService, SweetAlert, toastr, $state, modifyOrderService) {
    $scope.serverDown = true;
    $scope.orders = [];
    $scope.materialPreloader = true;
    $scope.fabState = 'closed';

    loadOrders();
    
    function loadOrders(){
        orderService.getOrders()
        .then(function(orders){
            $scope.materialPreloader = false;
            $scope.orders = orders;
            $scope.serverDown = false;
        },function(error){
            $scope.materialPreloader = false;
            SweetAlert.swal('Error','No se pudieron cargar las ordenes, el servidor no está disponible en este momento','error');
        });
    };

    $scope.dispatchOrder = function(order){
        $state.go('admin.orderManage.ordersList');
        $scope.orders.splice(order, 1);
        SweetAlert.swal('¡Éxito!','La orden ha sido despachada', 'success');
    };
    
    $scope.cancelOrder = function(order){
        $state.go('admin.orderManage.ordersList');
        $scope.orders.splice(order,1);
        SweetAlert.swal('¡Éxito!','Se ha cancelado la orden correctamente','success');
    };

    $scope.toggle = function(){
        if($scope.fabState === 'closed')
            $scope.fabState = 'open';
        else
            $scope.fabState = 'closed';
    }

    $scope.incrementChosenItemQuantity = function(order, chosenItem){
        modifyOrderService.incrementOrderChosenItemQuantity(order, chosenItem);
    };

    $scope.decrementChosenItemQuantity = function(order, chosenItem){
        modifyOrderService.decrementOrderChosenItemQuantity(order, chosenItem);
    };

    $scope.goToOrderItemsList = function(order){
        $state.go('admin.orderManage.orderDetails', {idOrden: order.id, order: order});
    }

    var orderNotificationService = notificationService("orders");
    
    orderNotificationService.on('newOrder', function(data){
       $scope.orders.push(data); 
       toastr.info('¡Hay una nueva orden!');
    });

       
}]);