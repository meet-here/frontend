(function() {
    var app = angular.module('mapview', ["leaflet-directive", "vxWamp", 'ngRoute', 'ngMaterial']);
    
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/map', {
            templateUrl: 'apps/mapview/mapview.html'
        });
    }]);

    app.controller('MapViewController', [ '$scope', 'Markers', "$wamp", function($scope, markers, $wamp) {
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
                    reuseTiles: true
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

        $scope.$on("leafletDirectiveMarker.dragend", function(event, args) {
            args.model.dirty = true;
            $scope.markers[args.modelName] = args.model;

        });

        $scope.$watch('markers', function(newValue, oldValue) {
            for (var property in newValue) {
                if (!newValue.hasOwnProperty(property)) {
                    continue;
                }
                var marker = newValue[property];
                if (marker.dirty) {
                    // sync the new position of the marker
                    console.log("lat: " + marker.lat);
                    console.log("long: " + marker.lng);
                    marker.dirty = false;
                }
            }
        }, true);
    }]);

    app.controller("RoomSelectController", function ($scope, $timeout, $mdBottomSheet) {
        $scope.showRoomSelect = function ($event) {
            $mdBottomSheet.show({
                templateUrl: 'apps/mapview/roomSelectTemplate.html',
                controller: 'RoomController',
                targetEvent: $event
            }).then(function (clickedItem) {
                // do something
            });
        }
    });

    app.controller("RoomController", function ($scope, $mdBottomSheet) {
        $scope.items = [
            { name: 'School', icon: 'school' },
            { name: 'Mail', icon: 'mail' },
            { name: 'Message', icon: 'message' },
            { name: 'Copy', icon: 'content_copy' }
        ];

        $scope.listItemClick = function ($index) {
            $mdBottomSheet.hide($scope.items[$index]);
        }
    });

})();