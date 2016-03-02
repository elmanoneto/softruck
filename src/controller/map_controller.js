app.controller('MapController', function ($scope, GeolocationService) {

  $scope.coord = {};
  $scope.isOpen = false;
  $scope.paths = {};

  GeolocationService.getCurrentPosition().then(function (data) {
    $scope.coord.lat = data.coords.latitude;
    $scope.coord.lng = data.coords.longitude;
    $scope.coord.zoom = 15;
  });

  $scope.category = 'selecione';


  $scope.getTopFivePlaces = function () {
    $scope.paths = {};
    $scope.markersTop = [];
    $scope.venues = [];
    GeolocationService.getTopFivePlaces($scope.coord.lat, $scope.coord.lng).then(function (data) {
      console.log(data);
      $scope.venues = data.data.response.venues;
      var venues = data.data.response.venues;
      console.log(venues);
      for (var i in venues) {
        $scope.markersTop.push(
          {
            lat: venues[i].location.lat,
            lng: venues[i].location.lng,
            focus: true,
            message: venues[i].name +' - Checkins: '+venues[i].stats.checkinsCount,
          }
        );
      }
    })
  }

  $scope.getByCategoryAndRadius = function (category, radius) {
    $scope.paths = {};
    $scope.markersTop = [];
    GeolocationService.getByCategoryAndRadius($scope.coord.lat, $scope.coord.lng, category, radius).then(function (data) {
      var venues = data.data.response.venues;
      for (var i in venues) {
        $scope.markersTop.push(
          {
            lat: venues[i].location.lat,
            lng: venues[i].location.lng,
            focus: true,
            message: venues[i].name,
          }
        );
      }
    })
  }

  $scope.getHotPlaces = function (event) {
    $scope.markersTop = [];
    GeolocationService.getHotPlaces($scope.coord.lat, $scope.coord.lng).then(function (data) {
      var venue = data.data.response.venues[0].location;
      var location = {
        local: {
          lat: venue.lat,
          lng: venue.lng
        }
      }

      var pathsDict = {
          circleMarker: {
              type: "circle",
              color: '',
              radius: 2000,
              latlngs: location.local
          }
      }

      if (data.data.response.venues.length < 30 ) {
        pathsDict.circleMarker.color = 'green';
      } else {
        pathsDict.circleMarker.color = 'red';
      }

      $scope.paths['circle'] = pathsDict.circleMarker;
    })
  }

})
