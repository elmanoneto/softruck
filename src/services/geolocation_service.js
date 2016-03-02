app.factory('GeolocationService', function ($q,$window, $http, API) {
  var deferred;

  function getCurrentPosition() {
      deferred = $q.defer();

      if (!$window.navigator.geolocation) {
        deferred.reject('Geolocation not supported.');
      } else {
        $window.navigator.geolocation.getCurrentPosition(
          function (position) {
            deferred.resolve(position);
          },
          function (err) {
            deferred.reject(err);
        });
      }
      return deferred.promise;
  }

  function getTopFivePlaces(lat, long) {
    deferred = $q.defer();

    $http.get(API.URL+'?client_id='+API.CLIENT_ID+'&client_secret='+API.CLIENT_SECRET+'&ll='+lat+','+long+'&limit=5&v=20140806&m=foursquare')
      .then(function (data) {
        deferred.resolve(data);
      })
      return deferred.promise;
  }

  function getHotPlaces(lat, long) {
    deferred = $q.defer();

    $http.get(API.URL+'?client_id='+API.CLIENT_ID+'&client_secret='+API.CLIENT_SECRET+'&ll='+lat+','+long+'&limit=50&v=20140806&m=foursquare')
      .then(function (data) {
        deferred.resolve(data);
      })
      return deferred.promise;
  }

  function getByCategoryAndRadius(lat, long, category, radius) {
    deferred = $q.defer();

    $http.get(API.URL+'?client_id='+API.CLIENT_ID+'&client_secret='+API.CLIENT_SECRET+'&ll='+lat+','+long+'&query='+category+'&radius='+radius+'&v=20140806&m=foursquare')
      .then(function (data) {
        deferred.resolve(data);
      })
      return deferred.promise;
  }

  return {
      getCurrentPosition: getCurrentPosition,
      getTopFivePlaces: getTopFivePlaces,
      getHotPlaces: getHotPlaces,
      getByCategoryAndRadius: getByCategoryAndRadius
  };
})
