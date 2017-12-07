(function() {
'use strict';

    angular
        .module('TechMenuApp')
        .controller('DishManageController', DishManageController);

    DishManageController.$inject = ['$scope', 'dishService', 'SweetAlert','notificationService','$state', '$q'];

    function DishManageController($scope, dishService, SweetAlert, notificationService, $state, $q) {
         $scope.name = "Platillo";
         $scope.newDish;
         $scope.dishes;
         $scope.materialPreloader = true;

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

         $scope.addDish = function(newDish){
            dishService.addDish(newDish)
                .then(function(success){
                    SweetAlert.swal('¡Éxito!', 'El platillo se ha agregado al menú correctamente', 'success');
                    addToDishesList(success.data);
                    $state.go('admin.dishManage.dishesList');
                    $scope.newDish = null;
                }, function(error){
                    console.log(error);
                    SweetAlert.swal('¡Error!', error.data.message, 'error');
             });
        }

        $scope.modifyDish = function(dish){
			var deferred = $q.defer();

            console.log(dish);
            SweetAlert.swal({
                title:'¿Seguro que quieres modificar el platillo?',
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: 'No',
                confirmButtonText: 'Sí',
                closeOnConfirm: 'false'
            }, function(clientResponse){
                if(clientResponse === true){
                    dishService.modifyDish(dish)
                        .then(function(successResponse){
                             SweetAlert.swal('¡Éxito!', successResponse.data, 'success');
                             dish.name = successResponse.config.data.name;
                             dish.description = successResponse.config.data.description;
                             dish.price = successResponse.config.data.price;
                             dish.photoURL = successResponse.config.data.photoURL;
                             refreshDishInformation(dish);
							 deferred.resolve(successResponse);
                        }).catch(function(errorResponse){
                             SweetAlert.swal('¡Error!', errorResponse.data.message, 'error');
							 deferred.reject(errorResponse);
                        });
                }else{
                    swal.close();
					deferred.resolve('Accion cancelada');
                }
            });

			return deferred.promise;
            
        };
        
        $scope.removeDish = function(dish){
            dishService.removeDish(dish)
                .then(function(success){
                     SweetAlert.swal('¡Éxito!', success.data, 'success');
                     removeFromDishesList(dish);
                }, function(error){
                    SweetAlert.swal('¡Error!', error.data.message, 'error');
            });
        };
        
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
    }

})();