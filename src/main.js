var app = angular.module('Softruck', ['ngRoute', 'leaflet-directive']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {templateUrl: 'src/partials/map.html', controller: 'MapController'})
    .otherwise({redirectTo: '/'});
})
