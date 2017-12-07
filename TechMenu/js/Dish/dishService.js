techMenuApp.service('dishService', function($http, serverUrl, $q){

     this.promise;
     
     this.getDishes = function(){
           if(!this.promise)
                 this.promise = fetchDishesFromAPI();
           

           return this.promise;
     };

     function fetchDishesFromAPI(){
           
            var promise = $http.get(serverUrl+'/api/dish')
                  .then(function(response){
                                          
                        response.data.forEach(function(element) {
                              element.itemType = 'Platillo';
                        }, this);

                        return response.data

                  }, function(error){
                        return error;
                  });

            return promise;
     }
     
     this.addDish = function(dish){

           var deferred = $q.defer();

           $http({
              url: serverUrl+'/api/dish/AddDish/',
              method: 'POST',
              data: dish
           }).then(function(response){
                 deferred.resolve(response);
           }, function(error){
                 deferred.reject(error);
           });

           return deferred.promise;
     };
     
     this.modifyDish = function(dish){

           var deferred = $q.defer();  
           $http({
              url: serverUrl+'/api/dish/modifydish/'+dish.id,
              method: 'PUT',
              data: dish   
           }).then(function(response){
                 deferred.resolve(response);
           }, function(error){
                 deferred.reject(error);
           });
           
         return deferred.promise;
     };
     
     this.removeDish = function(dish){

           var deferred = $q.defer();

           
           $http({
                 url: serverUrl+'/api/dish/deletedish/'+dish.id,
                 method: 'DELETE',
           }).then(function(success){
                 deferred.resolve(success);
           }, function(error){
                 deferred.reject(error);      
           });
           
           return deferred.promise;
           
     };
     
});
