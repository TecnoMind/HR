
app.controller("btnCtrl",["$scope",function($scope){
$scope.InfoVisibility=false;


$scope.ShowInfo=function(){
    $scope.InfoVisibility=true;
    console.log($scope.InfoVisibility)
}
}]);

