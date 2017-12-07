app.controller('fotosCtrl',
['$scope',function($scope) {
// $scope.fotos = [
// {

//     img:'img/nochePuerto.jpg',
//     area: 'EIT',
//     departamento:'Sistemas',
//     datos:'dcfddczczc',
//     Expanded: false
// },
// {
    
//     img: 'img/David.jpg',
//     area:'CFE',
//     departamento:'',
//     datos:'diego esta en esta area',
//     Expanded: false

// },
// {
//     img:'img/EnsenadaEITPano.jpg',
//     area: 'asdsa',
//     departamento:'',
//     datos:'ivan esta en esta area',
//     Expanded: false
// },
// {
//    img: 'img/contenedores.jpg',
//    area:'Control',
//    departamento:'',
//    datos:'fdsfdsfdf',
//     Expanded: false
// },
// {
//     img:'img/Ensenada11_0_2.jpg'  ,
//     area: 'seguridad',
//     departamento:'',
//     datos:'sdfdbfdscfds',
//     Expanded: false
// },
// {
//     img: 'img/EIT-Ensenada.jpg',  
//     area:'asdsa',
//     departamento:'',
//     datos:'sdfdfsdfdfa',
//     Expanded: false
// },
// {
//      img:'img/Ensenada11_0.jpg' ,
//      area:'sddasds',
//      departamento:'',
//      datos:'gbgfxgsdgfd',
//     Expanded: false
// },
// {
//     img: 'img/noticia11.jpg',
//     area:'sadsadsf',
//     departamento:'',
//     datos:'dfgdgthrwsfgvd',
//     Expanded: false
// }

// ];
// $scope.ShowInfo= function(index){
//      $scope.fotos[index].Expanded = !$scope.fotos[index].Expanded
//      console.log("Expanded")
//     }
// // $scope.ShowInfo=function(){
// //     if(scope.Expanded){
// //          $scope.fotos[index].Expanded=true;
// //     console.log($scope.Expanded)
// //     }else{

// //    $scope.Expanded=false;
// //     console.log($scope.Expanded)
// //     }
   
// // }
// // $scope.InfoVisibility=false;


// // $scope.ShowInfo=function(){
// //     $scope.InfoVisibility=true;
// //     console.log($scope.InfoVisibility)
// // }

function loadDepartments(){
    $http.get('http://hutchinsonserver.azurewebsites.net/api/departamentos').then(function(response){
        $scope.departamentos = response.data;
    })
}
}]);

