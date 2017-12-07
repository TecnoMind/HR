var techMenuApp = angular.module('TechMenuApp', ['angularMaterialPreloader','oitozero.ngSweetAlert','ngAnimate','toastr',
'angular-notification-icons','ng-mfb','ui.router']);

techMenuApp.value('serverUrl', 'http://techmenuapi.azurewebsites.net')

techMenuApp.config(function($stateProvider, $urlRouterProvider, toastrConfig) {

     configAppStates($stateProvider, $urlRouterProvider);
     initToastrConfig(toastrConfig);

});

function configAppStates($stateProvider, $urlRouterProvider, $rootScope){

    $stateProvider
          .state('menu',{
              url: '/Menu',
              templateUrl: './js/User/userMenuView.html',
              controller: 'OrderController'
          })

          .state('menu.dishContent',{
            url:'/Platillos',
            abstract: true,
            template: '<ui-view/>'
          })

          .state('menu.dishContent.dishesList',{
            url:'/Listado',
            templateUrl: './js/User/userMenuDishesPartial.html',
            controller: 'DishController'
          })

          .state('menu.beverageContent',{
            url:'/Bebidas',
            abstract: true,
            template: '<ui-view/>'
          })

          .state('menu.beverageContent.beverageList',{
            url:'/Listado',
            templateUrl: './js/User/userMenuBeveragesPartial.html',
            controller: 'BeverageController'
          })

          .state('menu.orderContent',{
              url:'',
              abstract: true,
              template: '<ui-view/>'
          })

          .state('menu.orderContent.myOrder',{
            url:'/MiOrden',
            templateUrl: './js/User/userOrderItemList.html'
          })

          .state('menu.orderContent.historialOrdenes',{
              url: '/HistorialOrdenes',
              templateUrl: './js/User/HistorialOrdenes/VistaHistorialOrdenes.html'
          })

          .state('menu.orderContent.orderDetails',{
              url:'/MiOrden/Item/{idItem}/Detalle',
              templateUrl: './js/User/userOrderItemDetailPartial.html',
              params:{
                  item: null
              },
              controller: function($scope, $stateParams){
                  $scope.item = $stateParams.item;
              }
          })


          .state('admin',{
              url: '/Admin',
              templateUrl: './js/Admin/adminMenuView.html',
              controller: 'OrderManageController'
          })

          .state('admin.orderManage',{
              url: '/Orden',
              abstract: true,
              template: '<ui-view/>'
          })

          .state('admin.orderManage.orderDetails', {
              url:'/{idOrden}/ListaItems',
              templateUrl: './js/Admin/adminOrderItemsListPartial.html',
              params: {
                  order: null
              },
              controller: 'OrderItemsListController'
          })
          
          .state('admin.orderManage.ordersList',{
              url:'/Listado',
              templateUrl: './js/Admin/adminOrderListPartial.html'
          })


          .state('admin.orderManage.orderItemDetails',{
              url:'/{idOrden}/Item/{idItem}/Detalle',
              templateUrl: './js/Admin/adminOrderItemDetailPartial.html',
              params: {
                  order: null,
                  item: null
              },
              controller: function($scope, $stateParams, $state, modifyOrderService) {
                  $scope.order = $stateParams.order;
                  $scope.item = $stateParams.item;

                  $scope.incrementItemQuantity = function(item){
                      var order = $scope.order;
                      modifyOrderService.incrementOrderChosenItemQuantity(order, item);
                  }

                  $scope.decrementItemQuantity = function(item){
                      var order = $scope.order;
                      modifyOrderService.decrementOrderChosenItemQuantity(order, item);
                      
                      if(item.quantity == 1)
                          $state.go('admin.orderManage.orderDetails',{idOrden:order.id, order:order});
                  }
             }
          })
 
          .state('admin.dishManage',{
              url: '/Platillos',
              abstract: true,
              template: '<ui-view/>',
              controller: 'DishManageController'
          })

          .state('admin.dishManage.dishesList',{
              url: '/Listado',
              templateUrl: './js/Admin/adminDishManagePartial.html',
          })

          .state('admin.dishManage.addDish',{
              url: '/Agregar',
              templateUrl: './js/Admin/adminNewDishPartial.html'
          })
 
          .state('admin.beverageManage',{
              url: '/Bebidas',
              abstract: true,
              template: '<ui-view/>',
              controller: 'BeverageManageController'
          })

          .state('admin.beverageManage.beverageList',{
              url: '/Listado',
              templateUrl: './js/Admin/adminBeverageManagePartial.html',
          })

          .state('admin.beverageManage.addBeverage',{
              url:'/Agregar',
              templateUrl: './js/Admin/adminNewBeveragePartial.html'
          })

        $urlRouterProvider.otherwise('/Menu/Platillos/Listado');
}

function initToastrConfig(toastrConfig){
    angular.extend(toastrConfig, {
      allowHtml: false,
      closeButton: false,
      positionClass: 'toast-bottom-left',
      closeHtml: '<button>&times;</button>',
      extendedTimeOut: 1000,
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning'
      },  
      messageClass: 'toast-message',
      autoDismiss: true,
      maxOpened: 0,
      progressBar: false,
      tapToDismiss: true,
      templates: {
        toast: 'directives/toast/toast.html',
        progressbar: 'directives/progressbar/progressbar.html'
      },
      timeOut: 2000,
      titleClass: 'toast-title',
      toastClass: 'toast'
    });
}