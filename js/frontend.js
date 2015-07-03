(function() {
    var app = angular.module('main', ['ngRoute', 'mapview', 'communicator','markerDebug']);
	app.factory('Markers', function() {
		return {
                        m1: {
                            lat: 52.55,
                            lng: 13.22,
                            message: "I'm a static marker",
                        },
                        m2: {
                            lat: 52.5,
                            lng: 13.2,
                            focus: true,
                            message: "I can be dragged!",
                            draggable: true,
                        }
		}
	});
		
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/map', {
                templateUrl: 'apps/mapview/mapview.html',
                controller: 'MapViewController'
            }).otherwise({
                redirectTo: '/map'
            });
    }]);
	
	
})();


