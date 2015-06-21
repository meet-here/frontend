(function() {
    var app = angular.module('main', ['ngRoute', 'mapview', 'communicator']);
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/map', {
                templateUrl: 'apps/mapview/mapview.html',
                controller: 'MapViewController'
            })
            .otherwise({
                redirectTo: '/map'
            });
    }]);
})();
