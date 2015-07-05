(function() {
    var app = angular.module('mapview', ['ngRoute']);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/map', {
            templateUrl: 'apps/mapview/mapview.html',
            controller: 'MapViewController'
        });
    }]);

    app.controller('MapViewController', [function() {
        var map = L.map('map');

        map.setView([52.509663, 13.376481], 14);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'magmabyte.9c6c65af',
            accessToken: 'pk.eyJ1IjoibWFnbWFieXRlIiwiYSI6IjMzMWJhZDY0NWI3NDEyNTViNjQ2ZTY1OTBmOWI1NDgyIn0.t3rvfNbF7wSl-VHWPu7BSg'
        }).addTo(map);

        function insertPolygon(coordinateList) {
            return L.polygon(coordinateList).addTo(map);
        }

        function onMapClick(e) {
            var popup = L.popup();

            popup
                .setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(map);
        }

        map.on('click', onMapClick);

        insertPolygon([[52.509663, 13.376481], [52.519663, 13.376481], [52.519663, 13.386481]]);
    }]);
})();
