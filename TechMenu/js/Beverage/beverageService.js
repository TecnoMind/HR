techMenuApp.service('beverageService', function($http, serverUrl, $q){

      this.promise;

            this.getBeverages = function(){
                  if(!this.promise)
                        this.promise = fetchBeveragesFromAPI();
                  

                  return this.promise;
            };

            function fetchBeveragesFromAPI(){

                  var promise = $http.get(serverUrl+'/api/Beverage')
                        .then(function(response){
                                                
                              response.data.forEach(function(element) {
                                    element.itemType = 'Bebida';
                              }, this);
                              
                              return response.data;

                        }, function(error){
                              return error;
                        });

                  return promise;
            }
            
            this.addBeverage = function(beverage){
                  var deferred = $q.defer();

                  $http({
                     url: serverUrl+'/api/beverage/AddBeverage/',
                     method: 'POST',
                     data: beverage
                  }).then(function(response){
                        deferred.resolve(response);
                  }, function(error){
                        deferred.reject(error);
                  });

                  return deferred.promise;
            };
            
            this.modifyBeverage = function(beverage){
                  
                  var deferred = $q.defer();

                  
                  $http({
                        url: serverUrl+'/api/Beverage/modifyBeverage/'+beverage.id,
                        method: 'PUT',
                        data: beverage   
                  }).then(function(response){
                        deferred.resolve(response);
                  }, function(error){
                        deferred.reject(error);
                  });
                  
                  return deferred.promise;
            };
            
            this.removeBeverage = function(beverage){
                  var deferred = $q.defer();

                  
                  $http({
                        url: serverUrl+'/api/Beverage/DeleteBeverage/'+beverage.id,
                        method: 'DELETE',
                  }).then(function(success){
                        deferred.resolve(success);
                  }, function(error){
                        deferred.reject(error);      
                  });
                  
                  return deferred.promise;
                  
            };
     
});
