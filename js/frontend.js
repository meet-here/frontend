(function() {
   var app = angular.module('main', ['ngRoute', 'mapview', 'communicator', 'markerDebug', 'ngMaterial']);
   app.factory('Markers', function() {
		return {
            m1: {
                lat: 52.55,
                lng: 13.22,
                message: "I'm a static marker",
                dirty: false
            },
            m2: {
                lat: 52.5,
                lng: 13.2,
                focus: true,
                message: "I can be dragged!",
                draggable: true,
                dirty: false
            }
		}
	});   

   app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/map'
            });
    }]);

    app.controller("MenuController", function ($scope, $mdUtil, $mdSidenav) {
        $scope.toggleMenu = $mdUtil.debounce(function () {
            $mdSidenav('menu')
                .toggle()
                .then(function () {
                    // maybe do sth.
                });
        }, 300);
    });

    app.controller("MenuControllerSideNav", function ($scope, $mdSidenav, $timeout, $location) {
        $scope.entries = [
            {title: "Map", path: "map"},
            {title: "Websocket Demo", path: "websockets"},
            {title: "Marker DebugView", path: "markerDebug"}
        ];

        $scope.close = function (newPath) {
            $location.path(newPath);
            $mdSidenav('menu').close();
        }
    });
})();

