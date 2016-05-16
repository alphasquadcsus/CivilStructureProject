angular.module('app.controllers', ['ionic'])

.controller('appCtrl', ['$scope', 'auth', function ($scope, auth, $ionicSideMenuDelegate) {
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.logOut = auth.logOut;

    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };
}])

.controller('authCtrl', ['$scope', '$state', 'auth', function ($scope, $state, auth) {
    $scope.user = {};
    $scope.user.type = "student";
    $scope.professional = false;

    $scope.professionaluser = function (bool) {
        $scope.professional = bool;
    };

    $scope.register = function () {
        auth.register($scope.user).error(function (error) {
            $scope.error = error;
        }).then(function () {
            $state.go('app.tabs.map');
        });
    };

    $scope.logIn = function () {
        auth.logIn($scope.user).error(function (error) {
            $scope.error = error;
        }).then(function () {
            $state.go('app.tabs.map');
        });
    };
}])

.controller('concretetoursCtrl', ['$scope', 'concretetours', function ($scope, tours) {
    tours.success(function (data) {
        $scope.concretetours = data;
    });
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

.controller('detailedtourCtrl', ['$scope', 'detailedtour', '$location', '$ionicPopup', '$ionicModal', '$ionicBackdrop', '$ionicSlideBoxDelegate', '$ionicScrollDelegate', '$state', '$ionicNavBarDelegate', function ($scope, tours, $location, $ionicPopup, $ionicModal, $ionicBackdrop, $ionicSlideBoxDelegate, $ionicScrollDelegate, $state) {

    $scope.clickQuiz = function (quizid) {
        $state.go('app.tabs.detailedquiz', {
            tourId: quizid
        });
    };

    $scope.data = {};
    $scope.rated = false;

    tours.getTour($location.path().split("/")[4]).success(function (data) {
        $scope.tours = data;
    });

    $scope.$on('$locationChangeStart', function () {
        if ($scope.modal) {
            $scope.modal.hide();
            $scope.modal.remove();
        }
    });

    $scope.ratingsObject = {
        iconOn: 'ion-ios-star',
        iconOff: 'ion-ios-star-outline',
        iconOnColor: 'rgb(200, 200, 100)',
        iconOffColor: 'rgb(33, 121, 37)',
        rating: 0,
        minRating: 1,
        callback: function (rating) {
            $scope.ratingsCallback(rating);
        }
    };

    $scope.ratingsCallback = function (rating) {
        $scope.data = {
            ratings: rating
        };
    };

    $scope.submitRating = function () {
        tours.setRate($location.path().split("/")[4], $scope.data).success(function () {
            $ionicPopup.alert({
                title: 'Rating Submitted!'
            });
            $scope.rated = true;

        });
        $scope.rated = true;
    };

    $scope.zoomMin = 1;

    $scope.showImages = function (index) {
        $scope.activeSlide = index;
        $scope.showpictureModal('templates/Tours/gallery-zoomview.html');
    };

    $scope.showpictureModal = function (templateUrl) {
        $ionicModal.fromTemplateUrl(templateUrl, {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
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

.controller('detailedquizCtrl', ['$scope', '$ionicHistory', '$http', '$location', 'quiz', '$ionicPopup', '$ionicNavBarDelegate', '$state', function ($scope, $ionicHistory, $http, $location, quiz, $ionicPopup, $ionicNavBarDelegate, $state) {
    $scope.foundquestions = false;

    $scope.backtoList = function () {
        $state.go('app.tabs.quizzes');
    };

    $scope.$on("$ionicView.enter", function () {
        $ionicNavBarDelegate.showBackButton(true);
    });

    quiz.getQuiz($location.path().split("/")[4]).success(function (data) {
        $scope.questions = data[0].questions;
        $scope.foundquestions = true;
    });

    $scope.start = function () {
        $ionicNavBarDelegate.showBackButton(false);
        if ($scope.foundquestions) {
            $scope.id = 0;
            $scope.quizOver = false;
            $scope.inProgress = true;
            $scope.score = 0;
            $scope.numberofquestions = 0;
            $scope.getQuestion();
        } else {
            $ionicPopup.alert({
                title: 'This tour site has no quiz questions!'
            });
        }
    };

    $scope.reset = function () {
        $scope.inProgress = false;
        $scope.score = 0;
        $ionicNavBarDelegate.showBackButton(true);
    };

    $scope.getQuestion = function () {
        var q = quiz.getQuestion($scope.questions, $scope.id);
        if (q) {
            $scope.question = q.question;
            $scope.options = q.options;
            $scope.answer = q.answer;
            $scope.hint = q.hint;
            $scope.answerMode = true;
        } else {
            $scope.quizOver = true;
        }
    };

    $scope.checkAnswer = function (option) {
        var ans = option;
        if (ans === $scope.options[$scope.answer]) {
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
        $scope.numberofquestions++;
    };

    $scope.submitQuiz = function () {
        $scope.data = {
            quizId: $location.path().split("/")[4],
            course: $scope.course,
            date: new Date().toLocaleString(),
            score: $scope.score,
            total: $scope.numberofquestions
        };
        quiz.submitQuiz($scope.currentUser(), $scope.data).success(function () {
            $ionicPopup.alert({
                title: 'Your Quiz has been submitted!'
            });
            $scope.reset();
        });
    };

}])

.controller('premapCtrl', function ($scope, tourmarkers, $state) {

    $scope.tours = {
        name: "none"
    };

    $scope.setTourMarkers = function (tourtype) {
        tourmarkers.setTourMarkers(tourtype);
        $state.go('app.tabs.mapview');
    };
})

.controller('mapCtrl', function ($scope, tourmarkers, $ionicSideMenuDelegate, $ionicPopup, $window) {

    console.log("Controller reloaded");

    $scope.$on("$ionicView.enter", function (scopes, states) {
        google.maps.event.trigger(map, 'resize');
        $ionicSideMenuDelegate.canDragContent(false);
    });

    $scope.getTourMarkers = function () {
        tourmarkers.getTourMarkers().success(function (data) {
            $scope.tourmarkers = data;
            console.log($scope.tourmarkers);
            drawMarkers();
        });
    };

    $scope.currentStop = 0;

    $scope.nextStop = function () {
        $scope.currentStop++;

        if ($scope.tourmarkers.length - 1 == $scope.currentStop) {

            var myPopup = $ionicPopup.show({
                template: '<input type="Finish"',
                title: 'Congratulations, you finished the tour!',
                subTitle: '<a href="https://www.surveymonkey.com/r/6H55Y2H">Review of app:</a> ',
                scope: $scope,
                buttons: [
                    {
                        text: 'BACK',
                        type: 'button-positive',
                        onTap: function (e) {
                            ionic.Platform.exitApp();
                            $scope.currentStop--;
                        }
                          },
                    {
                        text: 'DIFFERENT TOUR',
                        type: 'button-positive',
                        onTap: function (e) {
                            window.history.back();
                        }
                          }
                    /*,
                                                {
                                                text: 'SURVEY',
                                                type: 'button-positive',
                                                onTap: function(e) {
                                                 //   $state.go(window.open());
                                                }
                                              }*/
                        ]
            });

            myPopup.then(function (res) {
                console.log('Tapped!', res);
            });


        }
    };

    $scope.prevStop = function () {
        $scope.currentStop--;
        onSuccessDrawMarker(position);
        console.log("moving back" + $scope.currentStop);
    };

    ///////////////////Directions Display//////////////////////
    var directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true
    });
    var directionsService = new google.maps.DirectionsService;

    var drawMarkers = function (directionsService, directionsDisplay, marker) {

        var markers;
        var content;
        var infoWindow;

        function rad(x) {
            return x * Math.PI / 180;
        }

        var lat = marker.position.lat();
        var lng = marker.position.lng();
        var R = 6371; // radius of earth in km
        var distances = [];
        var distancesCopy = [];
        var shortest = -1;

        for (var i = 0; i < $scope.tourmarkers.length; i++) {

            content = '<div class="scrollFix">' +
                '<h2 style="text-align:center; background-color:#095a1f; color: #cba757;">' + $scope.tourmarkers[i].title + '</h2>' +
                '<a class="button button-small button-map" href="#/app/tabs/quizzes/' + $scope.tourmarkers[i].idno + '"> <b>Take a Quiz</b></a>' +
                '<a class="button button-small button-map" href="#/app/tabs/tours/' + $scope.tourmarkers[i]._id + '"><b>View Site Info</b></a>' +
                '</p>' + '</div>';

            infoWindow = new google.maps.InfoWindow({
                content: content
            });

            var point = new google.maps.LatLng($scope.tourmarkers[i].lat, $scope.tourmarkers[i].lon);

            var mlat = point.lat();
            var mlng = point.lng();
            var dLat = rad(mlat - lat);
            var dLong = rad(mlng - lng);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;

            distances[i] = d;
            distancesCopy[i] = d;

            distances.sort();

            var stopKey = distancesCopy.indexOf(distances[$scope.currentStop]);

            markers = new google.maps.Marker({
                label: "S",
                position: point,
                map: map,
                info: content
            });

            //SCOPE: 'this' refers to the current 'markers' object, we pass in the info and marker
            google.maps.event.addListener(markers, 'click', function () {
                if (infoWindow) {
                    infoWindow.close(map, this);
                }
                infoWindow.setContent(this.info);
                infoWindow.open(map, this);
            });
        }
        var dest_point_lat = ($scope.tourmarkers[stopKey].lat);
        var dest_point_lon = ($scope.tourmarkers[stopKey].lon);
        var dest_end = new google.maps.LatLng(dest_point_lat, dest_point_lon);

        directionsService.route({
            origin: marker.position,
            destination: dest_end,
            travelMode: google.maps.TravelMode.WALKING
        }, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });

    };


    var myLatlng = new google.maps.LatLng(38.5602, -121.4241);

    var mapOptions = {
        center: myLatlng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true,
        disableDefaultUI: true
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
        label: "*",
        position: myLatlng,
        map: map,
        title: 'SAC STATE',
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    });



    var onSuccess = function (position) {
        marker.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        $scope.map = map;
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


    ///////This new onSuccessDrawMarker and watchPosition refreshes drawMarkers at a slower time to prevent query timeout    
    var onSuccessDrawMarker = function (position) {
        marker.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        directionsDisplay.setMap(map);
        $scope.map = map;
        drawMarkers(directionsService, directionsDisplay, marker);
    };

    navigator.geolocation.watchPosition(onSuccessDrawMarker, onError, {
        maximumAge: 2000,
        timeout: 5400000,
        enableHighAcuracy: true
    });
});