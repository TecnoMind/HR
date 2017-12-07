angular.module('vanguardiaPostLoader')
       .controller('FBVideoCtrl', function($scope, $state, $stateParams){
            if(!$stateParams.video)
                $state.go('main.menu.coleccion');
            else
                $scope.video = $stateParams.video;
    
        });