(function() {
    'use strict';

    angular
        .module('TechMenuApp')
        .directive('newItemForm', newItemForm);

    newItemForm.$inject = [];
    function newItemForm() {

        var directive = {
            restrict: 'E',
            scope: {
                newItem: '=',
                itemType: '@',
                saveItem: '&'
            },
            templateUrl: './js/Shared/newItemFormTemplate.html'
        };
        
        return directive;
        
    }
})();