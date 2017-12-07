angular
    .module('App', [ 'ngMessages', 'ngAria', 'ngAnimate',  'ngMaterial']) 
    .config(function($mdThemingProvider) {
        $mdThemingProvider
            .theme('default')
            .primaryPalette('green')
            .accentPalette('yellow');
    })
    .controller('AppCtrl', function($scope, $mdSidenav) {
        $scope.toggleSidenav = function(menuId) {
            $mdSidenav(menuId).toggle();
        };
    });



    