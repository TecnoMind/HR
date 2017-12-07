techMenuApp.controller('OrderController',['$scope','orderTotalCalculationService','orderService', 'SweetAlert','toastr', '$state',
function($scope, orderTotalCalculationService, orderService, SweetAlert, toastr, $state){
  $scope.title = "Orden";
  $scope.clientName = '';
  $scope.order = {clientName: null, orderItems: [], orderTotal: 0};
  $scope.numberOfOrderedItems = 0;
  $scope.openedOrder = false;
  $scope.finishedOrder = false;
  $scope.materialPreloader = false;
  $scope.fabState = 'closed';

  $scope.addOrderItem = function(item){
       if(itemWasAlreadyAdded(item)){
             incrementOrderItemQuantity(item);
       }
       else{
             item.quantity = 1;
             $scope.order.orderItems.push(item);
             $scope.numberOfOrderedItems++;
       } 

       $scope.order.orderTotal = orderTotalCalculationService.calculateOrderTotal($scope.order.orderTotal, item);
       toastr.success('¡Agregaste '+item.name+' a tu orden!');
  };
  
  $scope.removeOrderItem = function(item){
    console.log(item.name+'cantidad: '+item.quantity);
    if(item.quantity == 1){
        _.remove($scope.order.orderItems, function(orderItem){
            console.log(orderItem);
            console.log(item.id);
            orderItem.id == item.id;
        });
        $scope.numberOfOrderedItems--;
        $state.go('menu.orderContent.myOrder');
    }
    else{
        item.quantity--;
        $scope.numberOfOrderedItems--;
    }

    $scope.order.orderTotal = orderTotalCalculationService.removedItemsCalculateOrderTotal($scope.order.orderTotal, item);

  };

  function itemWasAlreadyAdded(item){
    for(var i = 0; i < $scope.order.orderItems.length; i++){
       if($scope.order.orderItems[i].id === item.id && $scope.order.orderItems[i].name === item.name)
       {
           return true;
       }
    }
    
    return false;
  };
  
  
 function incrementOrderItemQuantity(item){
     item.quantity++;
     $scope.numberOfOrderedItems++; 
  };
  
  

  $scope.finishOrder = function(){
    
   if($scope.order.orderItems.length > 0){
         $scope.finishedOrder = true;
         $scope.order.clientName = $scope.clientName;
         $scope.materialPreloader = true;
    
        orderService.saveOrder($scope.order)
        .then(function(success){
            SweetAlert.swal("¡Éxito!", success.data, "success");
            $scope.materialPreloader = false;
            $state.go('menu.dishContent.dishesList');
            clearOrder();
        }).catch(function(error){
            SweetAlert.swal("¡Ups!, lo lamentamos", error.data, "error");
            $scope.materialPreloader = false;
            $state.go('menu.dishContent.dishesList');
            clearOrder();
        });
    } 
  };

  $scope.openOrder = function (){
      if(!$scope.openedOrder){
        showRequestNameAlert();
      }
  };

  $scope.goToOrderItemDetails = function(item){
      $state.go('menu.orderContent.orderDetails',{idItem:item.id, item:item});
  }
  
  function showRequestNameAlert(){
        toggle();

        SweetAlert.swal({
           title: '¿Estás listo para ordenar?',
           text: 'Por favor, escribe tu nombre',
           type:  'input',
           showCancelButton: false,
           allowEscapeKey: false,
           confirmButtonText: 'Empezar a ordenar',
           closeOnConfirm: false,
           inputPlaceholder: 'Nombre',
           animation: 'slide-from-top',
        }, function(inputValue){
            if(inputValue == '')
            {
               SweetAlert.swal('¡Error!','Necesitas escribir tu nombre','error');
            }
            else
            {
               $scope.clientName = inputValue;
               $scope.openedOrder = true;
               swal.close();
            }
        });
    }

    function toggle(){
      if($scope.fabState == 'open')
          $scope.fabState = 'closed';
      else  
          $scope.fabState = 'open';
    }

    function clearOrder(){
      $scope.openedOrder = false;
      $scope.order = null;
      $scope.orderTotal = 0;
      $scope.numberOfOrderedItems = 0;
    }
        
}]);
