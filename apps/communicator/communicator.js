(function() {
    var app = angular.module('communicator', ['ngRoute', 'vxWamp']);
    app.config(['$wampProvider', '$routeProvider', function ($wampProvider, $routeProvider) {
        var wsUri = (document.location.protocol === 'http:' ? 'ws:' : 'wss:') + '//' + document.location.host + '/ws';
        $wampProvider.init({
           url: wsUri,
           realm: 'realm1'
        });

        $routeProvider.when('/websockets', {
            templateUrl: 'apps/communicator/websockets.html',
            controller: 'CommunicationController'
        });
    }]);

    app.run(function ($wamp) {
        $wamp.open();
    });

    app.controller("CommunicationController", function($scope, $wamp) {
        $scope.name = "";
        $scope.message = "";
        // register RPC for illustration purposes
        $scope.set_name = function (args) {
           $scope.name = args[0];
        };
        //$wamp.register('de.meet_here.set_name', $scope.set_name);

        $scope.echo = function() {
          if ($scope.message) {
              // call a remote procedure
              $wamp.call('de.meet_here.hello', [$scope.message]).then(
                  function (result) {
                      $scope.name = 'de.meet_here.hello returns: ' + result;
                  },
                  function (error) {
                      debugger;
                      $scope.name = 'de.meet_here.hello error: ' + error;
                  }
              );
          }
        };

    });
})();