angular.module('app.services', [])

function initMap() {
    setMarkers(map, type);
}

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
var steelSites = [
  ['Guy West Bridge', -33.890542, 151.274856, 4],
  ['Site 2', -33.923036, 151.259052, 5],
  ['Site 3', -34.028249, 151.157507, 3],
  ['Site 4', -33.80010128657071, 151.28747820854187, 2],
  ['Site 5', -33.950198, 151.259302, 1]
];

var timberSites = [
  ['Site 1', -33.890542, 151.274856, 4],
  ['Site 2', -33.923036, 151.259052, 5],
  ['Site 3', -34.028249, 151.157507, 3],
  ['Site 4', -33.80010128657071, 151.28747820854187, 2],
  ['Site 5', -33.950198, 151.259302, 1]
];

var concreteSites = [
  ['Site 1', -33.890542, 151.274856, 4],
  ['Site 2', -33.923036, 151.259052, 5],
  ['Site 3', -34.028249, 151.157507, 3],
  ['Site 4', -33.80010128657071, 151.28747820854187, 2],
  ['Site 5', -33.950198, 151.259302, 1]
];

var lateralSites = [
  ['Site 1', -33.890542, 151.274856, 4],
  ['Site 2', -33.923036, 151.259052, 5],
  ['Site 3', -34.028249, 151.157507, 3],
  ['Site 4', -33.80010128657071, 151.28747820854187, 2],
  ['Site 5', -33.950198, 151.259302, 1]
];

function setMarkers(map, type) {
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
                position: {
                    lat: steel[1],
                    lng: steel[2]
                },
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
                position: {
                    lat: timber[1],
                    lng: timber[2]
                },
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
                position: {
                    lat: concrete[1],
                    lng: concrete[2]
                },
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
                position: {
                    lat: lateral[1],
                    lng: lateral[2]
                },
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