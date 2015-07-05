(function() {
    var app = angular.module('main', ['ngRoute', 'mapview', 'communicator']);
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/map'
            });
    }]);
})();
