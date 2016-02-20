angular.module('app.controllers', ['ionic'])

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

.directive('hideTabs', function ($rootScope) {
    return {
        restrict: 'A',
        link: function ($scope, $el) {
            $rootScope.hideTabs = 'tabs-item-hide';
            $scope.$on('$destroy', function () {
                $rootScope.hideTabs = '';
            });
        }
    };
})

.controller('concretetoursCtrl', ['$scope', 'concretetours', 'tourmarkers', function ($scope, tours, tourmarkers) {
    tours.success(function (data) {
        $scope.concretetours = data;
    });

    $scope.setTourMarkers = function (tourtype) {
        tourmarkers.setTourMarkers(tourtype);
    };
    
}])

.controller('steeltoursCtrl', ['$scope', 'steeltours', function ($scope, tours) {
    tours.success(function (data) {
        $scope.steeltours = data;
    });
}])

.controller('lateraltoursCtrl', ['$scope', 'lateraltours', function ($scope, tours) {
    tours.success(function (data) {
        $scope.lateraltours = data;
    });
}])

.controller('timbertoursCtrl', ['$scope', 'timbertours', function ($scope, tours) {
    tours.success(function (data) {
        $scope.timbertours = data;
    });
}])

.controller('connectionstoursCtrl', ['$scope', 'connectionstours', function ($scope, tours) {
    tours.success(function (data) {
        $scope.connectionstours = data;
    });
}])

.controller('detailedtourCtrl', ['$scope', 'detailedtour', '$location', function ($scope, tours, $location, $ionicPopup, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

    tours.getTour($location.path().split("/")[4]).success(function (data) {
        $scope.tours = data;
    });

    $scope.showPopup = function () {
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
    };

    //$scope.zoomMin = 16;

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
}])

.controller('detailedquizCtrl', ['$scope', '$http', '$location', 'quiz', function ($scope, $http, $location, quiz) {

    quiz.getQuiz($location.path().split("/")[4]).success(function (data) {
        $scope.questions = data[0].questions;
    });

    $scope.start = function () {
        $scope.id = 0;
        $scope.quizOver = false;
        $scope.inProgress = true;
        $scope.score = 0;
        $scope.getQuestion();
    };

    $scope.reset = function () {
        $scope.inProgress = false;
        $scope.score = 0;
    };

    $scope.getQuestion = function () {
        console.log("Getting Question:");
        console.log($scope.id);
        var q = quiz.getQuestion($scope.questions, $scope.id);
        if (q) {
            $scope.question = q.question;
            console.log(q);
            $scope.options = q.options;
            $scope.answer = q.answer;
            $scope.answerMode = true;
        } else {
            $scope.quizOver = true;
        }
    };

    $scope.checkAnswer = function (option, index) {
        //if (!$('input[name=answer]:checked').length) return;
        //var ans = $('input[name=answer]:checked').val();
        var ans = option;
        if (ans == $scope.options[$scope.answer]) {
            $scope.score++;
            $scope.correctAns = true;
        } else {
            $scope.correctAns = false;
        }
        $scope.answerMode = false;
    };

    $scope.nextQuestion = function () {
        $scope.id++;
        $scope.getQuestion();
    };

}])

.controller('newsCtrl', function ($scope, $http) {
    $http.get('http://localhost:8080/api/news').then(function (result) {
        console.log('Success', result);
        $scope.news = result.data;
    }, function (err) {
        console.error('ERR', err);
    });
})

/*.controller('quizzesCtrl', function ($scope, $ionicSideMenuDelegate, $ionicModal) {

    $ionicModal.fromTemplateUrl('templates/Quizzes/quizregister.html', function (modal) {
        $scope.modal = modal;
    }, {
        animation: 'slide-in-up'
    });


})*/

/*.controller('quizloginCtrl', function ($scope, $ionicSideMenuDelegate, $ionicPopup) {

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
})*/

.controller('premapCtrl', function ($scope, tourmarkers) {

    $scope.tours = {
        name: "none"
    };

    $scope.setTourMarkers = function (tourtype) {
        tourmarkers.setTourMarkers(tourtype);
    };
})

.controller('mapCtrl', function ($scope, tourmarkers, $ionicSideMenuDelegate, $ionicPopup) {

    $ionicSideMenuDelegate.canDragContent(false);

    $scope.getTourMarkers = function () {
        tourmarkers.getTourMarkers().success(function (data) {
            $scope.tourmarkers = data;
            console.log($scope.tourmarkers);
            drawMarkers();
        });
    };

    var drawMarkers = function () {

        var markers;
        var content;
        var infoWindow;

        for (var i = 0; i < $scope.tourmarkers.length; i++) {
            content = '<h2>' + $scope.tourmarkers[i].title + '</h2>' +
                '<br />' +
                '<p>' +

                '</p>';

            infoWindow = new google.maps.InfoWindow({
                content: content
            });

            var point = new google.maps.LatLng($scope.tourmarkers[i].lat, $scope.tourmarkers[i].lon);

            markers = new google.maps.Marker({
                label: "S",
                animation: google.maps.Animation.DROP,
                position: point,
                map: map,
                info: content
            });
			
            //SCOPE: 'this' refers to the current markers object, we pass in the info and marker
            google.maps.event.addListener(markers, 'click', function () {
                infoWindow.setContent(this.info);
                infoWindow.open(map, this);
            });

        }

    };

			/////////////
var closest = function (marker, tourmarkersList) {    
    var pi = Math.PI;
    var R = 6371; //equatorial radius
    var distances = [];
    var tourmarkers = tourmarkersList;
    var closest = -1;
	var lat1 = marker.position.lat();
	var lon1 = marker.position.lng();

    for( i=0;i<tourmarkers.length; i++ ) {  
        var current = new google.maps.LatLng(tourmarkers[i].lat, tourmarkers[i].lon);
        var lat2 = current.lat();
        var lon2 = current.lng();

        var chLat = lat2-lat1;
        var chLon = lon2-lon1;

        var dLat = chLat*(pi/180);
        var dLon = chLon*(pi/180);

        var rLat1 = lat1*(pi/180);
        var rLat2 = lat2*(pi/180);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(rLat1) * Math.cos(rLat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;

        distances[i] = d;
        if ( closest == -1 || d < distances[closest] ) {
            closest = i;
        }
    }

    // (debug) The closest marker is:
    return (tourmarkers[closest]);
};
    var myLatlng = new google.maps.LatLng(38.5602, -121.4241);

    var mapOptions = {
        center: myLatlng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: false,
        disableDefaultUI: true
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Sac State'
    });
////////////Directions Display/////////////////
	var directionsDisplay = new google.maps.DirectionsRenderer;
	var directionsService = new google.maps.DirectionsService;
	
	
var calculateAndDisplayRoute = function(directionsService, directionsDisplay, marker, dest) {
	var lat = dest.lat;
    var lon = dest.lng;
    directionsService.route({
		//origin: {lat:38.53, lng: -121.41555},
		origin: marker.position,
		//destination: {lat:38.558961, lng: -121.423011},
        destination: {lat:lat, lng:lon},
		//destination: dest.position,
		travelMode: google.maps.TravelMode.WALKING
	}, function(response,status) {
		if(status==google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		} else {
			window.alert('Directions request failed due to ' + status);
		}
	});
};
	
	
	////////////////////////

    var onSuccess = function (position) {

        marker.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
		directionsDisplay.setMap(map);
		var dest = new google.maps.Marker({});
        //dest.setPosition(38.558961,-121.423011);
		//dest.setPosition((closest(marker, $scope.tourmarkers)).position);  // if you can get this line to work without commenting it out then you're set
		calculateAndDisplayRoute(directionsService,directionsDisplay, marker, dest);
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