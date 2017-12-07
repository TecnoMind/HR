(function() {
'use strict';

    angular
        .module('TechMenuApp')
        .factory('CRUDOpToastrService', CRUDOpToastrService);

    CRUDOpToastrService.$inject = ['toastr'];

    function CRUDOpToastrService(toastr) {
        
        var service = {
            showAddedItemToastr:showAddedItemToastr,
            showModifiedItemToastr: showModifiedItemToastr,
            showRemovedItemToastr: showRemovedItemToastr
        };

        function showAddedItemToastr(addedItemInfo) { 
            toastr.info(addedItemInfo.name+' se ha agregado al menú');
        }

        function showModifiedItemToastr(modifiedItemInfo){
            toastr.warning(modifiedItemInfo.name+' se ha modificado');
        }

        function showRemovedItemToastr(removedItemInfo){
            toastr.error(removedItemInfo.name+' se ha eliminado del menú');
        }

        return service;
    };

})();