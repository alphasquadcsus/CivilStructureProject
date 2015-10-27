angular.module('starter.controllers', ['ionic', 'ngCordova']) //Remove 'ionic later? google map testing.

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

.controller('toursCtrl', function ($scope, $http) {

    /*    //delete $http.defaults.headers.common['X-Requested-With'];
        $http.get('http://localhost:8080/api/tours').then(function (result) {
            console.log('Success', result);
            $scope.concretetours = result.data;
        }, function (err) {
            console.error('ERR', err);
            // err.status will contain the status code
        })*/

})


.controller('concretetoursCtrl', function ($scope, $http) {
    //delete $http.defaults.headers.common['X-Requested-With'];
    $http.get('http://localhost:8080/api/concretetours').then(function (result) {
        console.log('Success', result);
        $scope.concretetours = result.data;
    }, function (err) {
        console.error('ERR', err);
    })
})

.controller('steeltoursCtrl', function ($scope, $http) {
    $http.get('http://localhost:8080/api/steeltours').then(function (result) {
        console.log('Success', result);
        $scope.steeltours = result.data;
    }, function (err) {
        console.error('ERR', err);
    })
})

.controller('lateraltoursCtrl', function ($scope, $http) {
    $http.get('http://localhost:8080/api/lateraltours').then(function (result) {
        console.log('Success', result);
        $scope.lateraltours = result.data;
    }, function (err) {
        console.error('ERR', err);
    })
})

.controller('timbertoursCtrl', function ($scope, $http) {
    $http.get('http://localhost:8080/api/timbertours').then(function (result) {
        console.log('Success', result);
        $scope.timbertours = result.data;
    }, function (err) {
        console.error('ERR', err);
    })
})

.controller('connectionstoursCtrl', function ($scope, $http) {
    $http.get('http://localhost:8080/api/connectionstours').then(function (result) {
        console.log('Success', result);
        $scope.connectionstours = result.data;
    }, function (err) {
        console.error('ERR', err);
    })
})

.controller('newsCtrl', function ($scope) {
    $scope.news = [
        {
            username: 'Alpha Squad',
            date: '10/22/15',
            icon: 'img/Sacramento_State_Hornets_Logo.png',
            picture: 'img/nodejs-logo.png',
            post: 'We are working on integrating the backend expressjs using a mongodb into the admin control website and the mobile app, many pages such as this news page, tours, and quizzes have been set todisplay off of json-like data structures in the controllers, retrieving and populating data from mongodb will be next.'
        },
        {
            username: 'Alpha Squad',
            date: '9/29/15',
            icon: 'img/Sacramento_State_Hornets_Logo.png',
            picture: 'img/guywestbridge.jpg',
            post: 'Guy West Bridge will be the first tour to be implemented.'
        },
        {
            username: 'Alpha Squad',
            date: '9/29/15',
            icon: 'img/Sacramento_State_Hornets_Logo.png',
            picture: 'This app is still under development, our goal is to create a scalable application by allowing professors to add additional tours and quiz questions to provide a fun interactive educational tool.',
            post: 'Guy West Bridge will be the first tour to be implemented.'
        },
        {
            username: 'Alpha Squad',
            date: '9/28/15',
            icon: 'img/Sacramento_State_Hornets_Logo.png',
            picture: 'img/netherlandbridge.jpg',
            post: 'his is a news/updates page where civil engineering news and/or new tours sites can be announced.'
        }

  ];

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
    $scope.data = {}
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

.controller('tourCtrl', function ($scope, $stateParams) {})

/*

.controller('detailedtourCtrl', function($scope, $stateParams, Tour, $http) {
  var tourData = $http.get('localhost:8080/api/tours');
tourData.then(function(result) {
    $scope.tours = result.data;
});
})

*/









.controller('mapCtrl', function ($scope, $ionicSideMenuDelegate, $ionicLoading, $compile, $ionicPopup, $cordovaGeolocation) {
    

var onSuccess = function(position) {
    
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
    
    
    
    
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

});
