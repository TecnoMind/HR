// import { Http, Response } from '@angular/http';



// class Componente {
//    axios.get('http: //hutchinsonserver.azurewebsites.net/aapi/departamentos/id/dispositivos).
//    then(function(usuarios){$scope.usuarios = usuarios})

 
// }

app.factory('DispFactory',function($http){

    var url='http: //hutchinsonserver.azurewebsites.net/api/departamentos';

    var DispFactory = {

    getDispositivos: function(){
    return $http.get(url).success(function(data){
           return data;
     })
     .error(function(err){
         console.log(err);
     })
    }

    };
    return DispFactory
});