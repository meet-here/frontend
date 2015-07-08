(function() {
    var app = angular.module('main', ['ngRoute', 'mapview', 'communicator', 'ngMaterial', 'ngAnimate']);
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
        ];

        $scope.close = function (newPath) {
            $location.path(newPath);
            $mdSidenav('menu').close();
        }
    });	
	
})();


