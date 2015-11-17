angular.module('app.controllers', ['ionic']) //Remove 'ionic later? google map testing.

// With the new view caching in Ionic, Controllers are only called
// when they are recreated or on app start, instead of every page change.
// To listen for when this page is active (for example, to refresh data),
// listen for the $ionicView.enter event:
//
//$scope.$on('$ionicView.enter', function(e) {
//});

.controller('appCtrl', function ($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };
})

.controller('concretetoursCtrl', function ($scope, $http) {
    $http.get('http://localhost:8080/api/concretetours').then(function (result) {
        console.log('Success', result);
        $scope.concretetours = result.data;
    }, function (err) {
        console.error('ERR', err);
    });
})

.controller('steeltoursCtrl', function ($scope, $http) {
    $http.get('http://localhost:8080/api/steeltours').then(function (result) {
        console.log('Success', result);
        $scope.steeltours = result.data;
    }, function (err) {
        console.error('ERR', err);
    });
})

.controller('lateraltoursCtrl', function ($scope, $http) {
    $http.get('http://localhost:8080/api/lateraltours').then(function (result) {
        console.log('Success', result);
        $scope.lateraltours = result.data;
    }, function (err) {
        console.error('ERR', err);
    });
})

.controller('timbertoursCtrl', function ($scope, $http) {
    $http.get('http://localhost:8080/api/timbertours').then(function (result) {
        console.log('Success', result);
        $scope.timbertours = result.data;
    }, function (err) {
        console.error('ERR', err);
    });
})

.controller('connectionstoursCtrl', function ($scope, $http) {
    $http.get('http://localhost:8080/api/connectionstours').then(function (result) {
        console.log('Success', result);
        $scope.connectionstours = result.data;
    }, function (err) {
        console.error('ERR', err);
    });
})

.controller('detailedtourCtrl', function ($scope, $http, $location, $ionicPopup, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

    $scope.showPopup = function() {
    $ionicPopup.show({
        title: 'Rate the site',
        template: '<div class="item range range-balanced"> <i class="icon ion-sad-outline"></i><input type="range" name="rating" min="0" max="5" value="5"><i class="icon ion-happy-outline"></i></div>',
        buttons: [{ // Array[Object] (optional). Buttons to place in the popup footer.
            text: 'Cancel',
            type: 'button-default',
  }, {
            text: 'OK',
            type: 'button-positive',
            onTap: function (e) {
                // Returning a value will cause the promise to resolve with the given value.
                return scope.data.response;
            }
  }]
    });
}


    $http.get('http://localhost:8080/api/tours/' + $location.path().split("/")[4]).then(function (result) {
        console.log('Success', result);
        console.log(result.data);
        $scope.tours = result.data;
    }, function (err) {
        console.error('ERR', err);
    });

    $scope.zoomMin = 1;


    $scope.showImages = function (index) {
        $scope.activeSlide = index;
        $scope.showModal('templates/Tours/gallery-zoomview.html');
    };

    $scope.showModal = function (templateUrl) {
        $ionicModal.fromTemplateUrl(templateUrl, {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
    };

    $scope.closeModal = function () {
        $scope.modal.hide();
        $scope.modal.remove();
    };

    $scope.updateSlideStatus = function (slide) {
        var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
        if (zoomFactor == $scope.zoomMin) {
            $ionicSlideBoxDelegate.enableSlide(true);
        } else {
            $ionicSlideBoxDelegate.enableSlide(false);
        }
    };
})

.controller('newsCtrl', function ($scope, $http) {
    $http.get('http://localhost:8080/api/news').then(function (result) {
        console.log('Success', result);
        $scope.news = result.data;
    }, function (err) {
        console.error('ERR', err);
    });
})


.controller('quizzesCtrl', function ($scope, $ionicSideMenuDelegate, $ionicModal) {

    $scope.timberquestions = [
        {
            title: 'Question 1'
        },
        {
            title: 'Question 2'
        },
        {
            title: 'Question 3'
        },
  ];

    $ionicModal.fromTemplateUrl('templates/Quizzes/quizregister.html', function (modal) {
        $scope.modal = modal;
    }, {
        animation: 'slide-in-up'
    });

})

.controller('quizloginCtrl', function ($scope, $ionicSideMenuDelegate, $ionicPopup) {
    
    $scope.data = {};
    $scope.showLogin = function () {
        var myPopup = $ionicPopup.show({
            template: '<input type="password" ng-model="data.wifi">',
            title: 'Login',
            subTitle: 'Please enter Sac State Student ID',
            scope: $scope,
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: '<b>Login</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        if (!$scope.data.wifi) {
                            //don't allow the user to close unless he enters Student ID
                            e.preventDefault();
                        } else {
                            return $scope.data.wifi;
                        }
                    }
      }
    ]
        });
        myPopup.then(function (res) {
            console.log('Tapped!', res);
        });
    };
})

.controller('settingsCtrl', function ($scope) {
    $scope.settingsList = [
        {
            text: "Wireless",
            checked: true
            },
        {
            text: "GPS",
            checked: false
            },
        {
            text: "Bluetooth",
            checked: false
            }
  ];
})

.controller('mapCtrl', function ($scope, $ionicSideMenuDelegate, $ionicLoading, $compile, $ionicPopup) {

    $ionicSideMenuDelegate.canDragContent(false);

    var myLatlng = new google.maps.LatLng(38.5602, -121.4241);

    var mapOptions = {
        center: myLatlng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true,
        disableDefaultUI: true
    };

    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Sac State'
    });

    var onSuccess = function (position) {
        var myLatlng2 = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
            content: compiled[0]
        });

        marker.setPosition(
            new google.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude)
        );


        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });

        $scope.map = map;
        //$scope.map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    };

    function onError(error) {
        alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    }

    navigator.geolocation.watchPosition(onSuccess, onError, {
        maximumAge: 3000,
        timeout: 5000,
        enableHighAccuracy: true
    });

});




    /*        var info =('Latitude: '          + position.coords.latitude          + '\n' +
                'Longitude: '         + position.coords.longitude         + '\n' +
                'Altitude: '          + position.coords.altitude          + '\n' +
                'Accuracy: '          + position.coords.accuracy          + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                'Heading: '           + position.coords.heading           + '\n' +
                'Speed: '             + position.coords.speed             + '\n' +
                'Timestamp: '         + position.timestamp                + '\n');
          
               $ionicPopup.alert({
                      title: 'Popup',
                      content: info 
                  });*/

// This is for the javascript google maps api, leaving here just in case

/*    $ionicSideMenuDelegate.canDragContent(false);
    $scope.init = function () {
            $ionicPopup.alert({
                title: 'Popup',
                content: 'Please enable GPS for best experience'
            });

            var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var mapOptions = {
                center: myLatlng,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControl: true,
                disableDefaultUI: true
            };
            var map = new google.maps.Map(document.getElementById("map"),
                mapOptions);

            //Marker + infowindow + angularjs compiled ng-click
            var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
            var compiled = $compile(contentString)($scope);

            var infowindow = new google.maps.InfoWindow({
                content: compiled[0]
            });

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: 'Sac State'
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });

            $scope.map = map;
        }


    $scope.centerOnMe = function () {
        if (!$scope.map) {
            return;
        }

        $scope.loading = $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function (pos) {
            $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            $scope.loading.hide();
        }, function (error) {
            alert('Unable to get location: ' + error.message);
        });
    };

    $scope.clickTest = function () {
        alert('Example of infowindow with ng-click')
    };*/