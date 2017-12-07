techMenuApp.controller('DishController', ['$scope', 'dishService','SweetAlert','notificationService','CRUDOpToastrService',
function($scope, dishService, SweetAlert, notificationService, CRUDOpToastrService){
      $scope.materialPreloader = true;
      $scope.dishes = [];

      loadDishes();

      function loadDishes(){
         dishService.getDishes()
         .then(function(dishes){ 
             $scope.materialPreloader = false;
             $scope.dishes = dishes;
         }, function (error) {
            $scope.materialPreloader = false;
            SweetAlert.swal('Error','Ocurrió un error al conectarse al servidor', 'error');
         });
      }
      
      var dishNotificationService = notificationService("dishes");
    
      dishNotificationService.on('newDish', function(dish){
        CRUDOpToastrService.showAddedItemToastr(dish);
        addToDishesList(dish); 
      });
      
      dishNotificationService.on('modifiedDish', function(dish){
        CRUDOpToastrService.showModifiedItemToastr(dish);
        refreshDishInformation(dish);
      });
      
      dishNotificationService.on('deletedDish', function(dish){
        CRUDOpToastrService.showRemovedItemToastr(dish);
        removeFromDishesList(dish);
      });

       function addToDishesList(dish){
            $scope.dishes.push(dish);
        }
        
        function refreshDishInformation(dish){
            for(var i = 0; i <= $scope.dishes.length; i++){
                if($scope.dishes[i].id == dish.id){
                    $scope.dishes[i].name = dish.name;
                    $scope.dishes[i].description = dish.description;
                    $scope.dishes[i].photoURL = dish.photoURL;
                    $scope.dishes[i].price = dish.price;

                    return;
                }
            }
        }
        
        function removeFromDishesList(dish){
            for(var i = 0; i <= $scope.dishes.length; i++){
                if($scope.dishes[i].id == dish.id){
                        $scope.dishes.splice(i, 1);
                        
                        return;
                }
            }
        }

}]);
