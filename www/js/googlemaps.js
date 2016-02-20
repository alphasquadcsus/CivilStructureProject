(function (global) {
    "use strict";

    function onDeviceReady() {
        document.addEventListener("online", onOnline, false);
        document.addEventListener("resume", onResume, false);
        loadMapsApi();
    }

    function onOnline() {
        loadMapsApi();
    }

    function onResume() {
        loadMapsApi();
    }

    function loadMapsApi() {
        if (navigator.connection.type === Connection.NONE || (global.google !== undefined && global.google.maps)) {
            return;
        }

        //TODO: Add your own Google maps API key to the URL below.
        $.getScript('https://maps.googleapis.com/maps/api/js?sensor=true&callback=onMapsApiLoaded');
    }

    global.onMapsApiLoaded = function () {
        // Maps API loaded and ready to be used.
        var map = new google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: new google.maps.LatLng(-34.397, 150.644)
        });
    };

    document.addEventListener("deviceready", onDeviceReady, false);
})(window);





//Google maps JavaScript initializer, this is where filtered parameters are used to 
//populate the google map for tours. Note that the anchor is set to (0,32) to correspond
//to the base of the flagpole.

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: -33.9, lng: 151.2}
  });
	//var type = 'steel';
  setMarkers(map,type);
}

function setMarkers(map,type) {
  // Adds markers to the map based on type 'steel','timber','concrete','lateral', 'connections', and 'all'

  // Marker sizes are expressed as a Size of X,Y where the origin of the image
  // (0,0) is located in the top left of the image.

  // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.

	var steelmapIcon = {
    url: 'img/steelmapIcon.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };
  	var timbermapIcon = {
    url: 'img/timbermapIcon.png',
    size: new google.maps.Size(20, 32),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 32)
  };
  	var concretemapIcon = {
    url: 'img/concretemapIcon.png',
    size: new google.maps.Size(20, 32),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 32)
  };
  	var lateralmapIcon = {
    url: 'img/lateralmapIcon.png',
    size: new google.maps.Size(20, 32),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 32)
  };
  
  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };
  if (type == 'steel') {
  for (var i = 0; i < steelSites.length; i++) {
    var steel = steelSites[i];
    var marker = new google.maps.Marker({
      position: {lat: steel[1], lng: steel[2]},
      map: map,
      icon: steelmapIcon,
      shape: shape,
      title: steel[0],
      zIndex: steel[3]
    });
  }
  }
  
  if (type == 'timber') {
    for (var i = 0; i < timberSites.length; i++) {
    var timber = timberSites[i];
    var marker = new google.maps.Marker({
      position: {lat: timber[1], lng: timber[2]},
      map: map,
      icon: timbermapIcon,
      shape: shape,
      title: timber[0],
      zIndex: timber[3]
    });
  }
  }
  if (type == 'concrete') {
    for (var i = 0; i < concreteSites.length; i++) {
    var concrete = concreteSites[i];
    var marker = new google.maps.Marker({
      position: {lat: concrete[1], lng: concrete[2]},
      map: map,
      icon: concretemapIcon,
      shape: shape,
      title: concrete[0],
      zIndex: concrete[3]
    });
  }
  }
  if (type == 'lateral') {
    for (var i = 0; i < lateralSites.length; i++) {
    var lateral = lateralSites[i];
    var marker = new google.maps.Marker({
      position: {lat: lateral[1], lng: lateral[2]},
      map: map,
      icon: lateralmapIcon,
      shape: shape,
      title: lateral[0],
      zIndex: lateral[3]
    });
  }
  }
  if (type == 'all') {
  
  
  }
}