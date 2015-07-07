(function() {

    var app = angular.module('markerDebug', ['ngRoute', 'ngMaterial']);
	app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/markerDebug', {
            templateUrl: 'apps/markerDebug/markerDebug.html',
            controller: 'markerDebugController'
        });
    }]);
	
    app.controller('markerDebugController', [ '$scope','Markers', function($scope, markers) {
        angular.extend($scope, {
			markers: markers,
            defaults: {}
        })
    }]);
	
})();