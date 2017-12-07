techMenuApp.controller('BeverageController', ['$scope', 'beverageService','SweetAlert','notificationService', 'CRUDOpToastrService',
function($scope, beverageService, SweetAlert, notificationService, CRUDOpToastrService){
      $scope.materialPreloader = true;
      $scope.beverages = [];

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
      
      var beverageNotificationService = notificationService("beverages");
    
      beverageNotificationService.on('newBeverage', function(beverage){
        CRUDOpToastrService.showAddedItemToastr(beverage);
        addToBeveragesList(beverage); 
      });
      
      beverageNotificationService.on('modifiedBeverage', function(beverage){
        CRUDOpToastrService.showModifiedItemToastr(beverage);
        refreshBeverageInformation(beverage)
      });
      
      beverageNotificationService.on('deletedBeverage', function(beverage){
        CRUDOpToastrService.showRemovedItemToastr(beverage);
        removeFromBeveragesList(beverage);
      });

              
        function addToBeveragesList(beverage){
            $scope.beverages.push(beverage);
        }
        
        function refreshBeverageInformation(beverage){
            for(var i = 0; i <= $scope.beverages.length; i++){
                if($scope.beverages[i].id == beverage.id){
                    $scope.beverages[i].name = beverage.name;
                    $scope.beverages[i].description = beverage.description;
                    $scope.beverages[i].photoURL = beverage.photoURL;
                    $scope.beverages[i].price = beverage.price;

                    return;
                }
            }
        }
        
        function removeFromBeveragesList(beverage){
            console.log(beverage);
            for(var i = 0; i <= $scope.beverages.length; i++){
                if($scope.beverages[i].id == beverage.id){
                        $scope.beverages.splice(i, 1);
                        return;
                }
            }
        }
}]);
