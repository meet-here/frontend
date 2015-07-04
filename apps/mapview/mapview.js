(function() {
    var app = angular.module('mapview', ["leaflet-directive"]);
    app.controller('MapViewController', [ '$scope','Markers', function($scope, markers) {
        angular.extend($scope, {
            center: {
                lat: 52.509663,
                lng:  13.376481,
                zoom: 14
            },
            tiles: {
                url:'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
                options: {
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    maxZoom: 18,
                    id: 'magmabyte.9c6c65af',
                    accessToken: 'pk.eyJ1IjoibWFnbWFieXRlIiwiYSI6IjMzMWJhZDY0NWI3NDEyNTViNjQ2ZTY1OTBmOWI1NDgyIn0.t3rvfNbF7wSl-VHWPu7BSg',
                    reuseTiles: true,
                }
			},
			markers: markers,
            defaults: {},
			events: {
                    markers:{
                      enable: [ 'dragend' ]
                      //logic: 'emit'
                    }
                }
        });
		 $scope.$on("leafletDirectiveMarker.dragend", function(event, args){
				$scope.markers[args.modelName] = args.model;
            });
    }]);
})();