var app= angular.module('App',['ngMessages', 'ngAria', 'ngAnimate',  'ngMaterial','ui.router'])
  .config(function($mdThemingProvider,$stateProvider,$urlRouterProvider) {
        $mdThemingProvider
            .theme('default')
            .primaryPalette('green')
            .accentPalette('yellow');

 $stateProvider
    .state('home',{
        url:'/home',
        templateUrl:'view/home.html'
       
    })
    .state('Programacion',{
        url:'/',
        templateUrl:'view/depaProgramacion.html',

    });
        $urlRouterProvider.otherwise('/home');
    })
    .controller('AppCtrl', function($scope, $mdSidenav) {
        $scope.toggleSidenav = function(menuId) {
            $mdSidenav(menuId).toggle();
        };
    });
    // .config(function($stateProvider,$urlProvider){
    
    // $stateProvider
    // .state('home',{
    //     url:'/home',
    //     templateUrl:'view/home.html'
       
    // });
    //     $urlRouterProvider.otherwise('/home');
    // });


