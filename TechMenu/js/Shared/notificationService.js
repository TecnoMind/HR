'use strict';

techMenuApp.factory('notificationService', ['$rootScope', 'serverUrl', 
  function ($rootScope, serverUrl) {

    function notificationService(hubName) {
      var connection = $.hubConnection(serverUrl);
      var proxy = connection.createHubProxy(hubName);

      connection.start({jsonp: true}).done(function () { });
      
      return {
        on: function (eventName, callback) {
              proxy.on(eventName, function (result) {
                $rootScope.$apply(function () {
                  if (callback) {
                    callback(result);
                  }
                 });
               });
             },
        invoke: function (methodName, callback) {
                  proxy.invoke(methodName)
                  .done(function (result) {
                    $rootScope.$apply(function () {
                      if (callback) {
                        callback(result);
                      }
                    });
                  });
                }
      };
    };

    return notificationService;
}]);