
(function(){
    'use strict';

    angular
        .module('TechMenuApp')
        .controller('HistorialOrdenesController', HistorialOrdenesController)

    /** @ngInject */
    HistorialOrdenesController.$inject = ['$scope'];
    function HistorialOrdenesController($scope){
        $scope.historialOrdenes = [
            {id: 2, cliente: 'Pedro', fecha: '9 de octubre'}
        ]

    }

}());