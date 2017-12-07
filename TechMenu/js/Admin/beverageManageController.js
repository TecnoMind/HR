(function() {
'use strict';

    angular
        .module('TechMenuApp')
        .controller('BeverageManageController', BeverageManageController);

    BeverageManageController.$inject = ['$scope','beverageService','SweetAlert','$state'];

    function BeverageManageController($scope, beverageService, SweetAlert, $state) {
         $scope.name = "Bebida";
         $scope.newBeverage;
         $scope.beverages;
         $scope.materialPreloader = true;

         loadBeverages();
      
         function loadBeverages(){
            beverageService.getBeverages()
            .then(function(beverages){ 
                $scope.materialPreloader = false;
                $scope.beverages = beverages;
            }, function (error) {
                $scope.materialPreloader = false;
                SweetAlert.swal('Error','Ocurrió un error al conectarse al servidor', 'error');
            });
         }
         

         $scope.addBeverage = function(newBeverage){
                beverageService.addBeverage(newBeverage)
                    .then(function(success){
                        SweetAlert.swal('¡Éxito!', 'La bebida se ha agregado al menú correctamente', 'success');
                        addToBeveragesList(success.data);
                        $state.go('admin.beverageManage.beverageList');
                        $scope.newBeverage = null;
                    }, function(error){
                        SweetAlert.swal('¡Error!', error.data.message, 'error');
                }); 
        };
      
        $scope.modifyBeverage = function(beverage){
            SweetAlert.swal({
                title:'¿Seguro que quieres modificar la bebida?',
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: 'No',
                confirmButtonText: 'Sí',
                closeOnConfirm: 'false'
            }, function(clientResponse){
                if(clientResponse == true){
                    beverageService.modifyBeverage(beverage)
                                .then(function(successResponse){
                                    SweetAlert.swal('¡Éxito!', successResponse.data, 'success');
                                    beverage.name = successResponse.config.data.name;
                                    beverage.description = successResponse.config.data.description;
                                    beverage.price = successResponse.config.data.price;
                                    beverage.photoURL = successResponse.config.data.photoURL;
                                    refreshBeverageInformation(beverage);
                                }, function(errorResponse){
                                    SweetAlert.swal('¡Error!', errorResponse.data.message, 'error');
                     });  
                }else{
                    swal.close();
                }
            });
            
        };
        
        $scope.removeBeverage = function(beverage){
            beverageService.removeBeverage(beverage)
                .then(function(success){
                    SweetAlert.swal('¡Éxito!', success.data, 'success');
                    removeFromBeveragesList(beverage);
                }, function(error){
                    SweetAlert.swal('¡Error!', error.data.message, 'error');
            });
        };
        
        function addToBeveragesList(beverage){
            $scope.beverages.push(beverage);
        }
        
        function refreshBeverageInformation(beverage){
            for(var i = 0; i <= $scope.beverages.length; i++){
                if( $scope.beverages[i].id == beverage.id){
                    $scope.beverages[i].name = beverage.name;
                    $scope.beverages[i].description = beverage.description;
                    $scope.beverages[i].photoURL = beverage.photoURL;
                    $scope.beverages[i].price = beverage.price;

                    return;
                }
            }
        }
        
        function removeFromBeveragesList(beverage){
            for(var i = 0; i <= $scope.beverages.length; i++){
                if($scope.beverages[i].id == beverage.id){
                        $scope.beverages.splice(i, 1);
                        return;
                }
            }
        }

    
    };

})();