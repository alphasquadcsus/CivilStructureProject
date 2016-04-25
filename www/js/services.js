angular.module('app.services', ['ionic'])

//********************************************* <Authentication Services> *********************************************\\

.factory('auth', ['$http', '$window', function ($http, $window) {
        var auth = {};

        auth.saveToken = function (token) {
            $window.localStorage['flapper-news-token'] = token;
        };

        auth.getToken = function () {
            return $window.localStorage['flapper-news-token'];
        };

        auth.isLoggedIn = function () {
            var token = auth.getToken();
            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        auth.currentUser = function () {
            if (auth.isLoggedIn()) {
                var token = auth.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.username;
            }
        };

        auth.register = function (user) {
            //return $http.post('https://civilappcsus.herokuapp.com/api/register', user).success(function (data) {
            return $http.post('http://localhost:8080/api/register', user).success(function (data) {
                auth.saveToken(data.token);
            });
        };

        auth.logIn = function (user) {
            //return $http.post('https://civilappcsus.herokuapp.com/api/login', user).success(function (data) {
            return $http.post('http://localhost:8080/api/login', user).success(function (data) {
                auth.saveToken(data.token);
            });
        };

        auth.logOut = function () {
            $window.localStorage.removeItem('flapper-news-token');
        };
        return auth;

}])

//********************************************* <//Authentication Services> *********************************************\\

//********************************************* <Tour Services> *********************************************\\
//These services retrieve the unique identifier (id #) of the tour, the title, the rating, and icon
//They are used when listing the tours in the tour page, and listing the available quizzes in the quiz page.

.factory('shorttours', ['$http', function ($http) {
    //return $http.get('https://civilappcsus.herokuapp.com/api/shorttours')
    return $http.get('http://localhost:8080/api/shorttours')
        .success(function (data) {
            return data;
        })
        .error(function (data) {
            return data;
        });
}])

.factory('concretetours', ['$http', function ($http) {
    //return $http.get('https://civilappcsus.herokuapp.com/api/concretetours')
    return $http.get('http://localhost:8080/api/concretetours')
        .success(function (data) {
            return data;
        })
        .error(function (data) {
            return data;
        });
}])

.factory('steeltours', ['$http', function ($http) {
    //return $http.get('https://civilappcsus.herokuapp.com/api/steeltours')
    return $http.get('http://localhost:8080/api/steeltours')
        .success(function (data) {
            return data;
        })
        .error(function (data) {
            return data;
        });
}])

.factory('lateraltours', ['$http', function ($http) {
    //return $http.get('https://civilappcsus.herokuapp.com/api/lateraltours')
    return $http.get('http://localhost:8080/api/lateraltours')
        .success(function (data) {
            return data;
        })
        .error(function (data) {
            return data;
        });
}])

.factory('timbertours', ['$http', function ($http) {
    //return $http.get('https://civilappcsus.herokuapp.com/api/timbertours')
    return $http.get('http://localhost:8080/api/timbertours')
        .success(function (data) {
            return data;
        })
        .error(function (data) {
            return data;
        });
}])

.factory('connectionstours', ['$http', function ($http) {
    //return $http.get('https://civilappcsus.herokuapp.com/api/connectionstours')
    return $http.get('http://localhost:8080/api/connectionstours')
        .success(function (data) {
            return data;
        })
        .error(function (data) {
            return data;
        });
}])

//Returns all information about the tour, title, description, pictures, etc.
.factory('detailedtour', ['$http', function ($http) {

    return {
        getTour: function (id) {
            //return $http.get('https://civilappcsus.herokuapp.com/api/tours/' + id);
            return $http.get('http://localhost:8080/api/tours/' + id)
                .success(function (data) {
                    return data;
                })
                .error(function (data) {
                    return data;
                });
        },
        setRate: function (id, data) {
            //return $http.put('https://civilappcsus.herokuapp.com/api/rate/' + id, data);
            return $http.put('http://localhost:8080/api/rate/' + id, data)
                .success(function (data) {
                    return data;
                })
                .error(function (data) {
                    return data;
                });
        }
    };

}])

//********************************************* <//Tour Services> *********************************************\\



//********************************************* <Quiz Services> *********************************************\\

.factory('quiz', ['$http', function ($http) {

    var getQuiz = function (id) {
        //var questions = $http.get('https://civilappcsus.herokuapp.com/api/quizzes/' + id);
        var questions = $http.get('http://localhost:8080/api/quizzes/' + id);
        return questions;
    };

    var getQuestion = function (questions, id) {
        if (id < questions.length) {
            return questions[id];
        } else {
            return false;
        }
    };


    return {
        getQuestion: getQuestion,
        getQuiz: getQuiz,
        submitQuiz: function (id, data) {
            //return $http.put('https://civilappcsus.herokuapp.com/api/user/' + id, data);
            return $http.put('http://localhost:8080/api/user/' +id, data)
                .success(function (data) {
                    return data;
                })
                .error(function (data) {
                    return data;
                });
        }
    };

}])

//********************************************* <//Quiz Services> *********************************************\\



//********************************************* <Map Services> *********************************************\\

.factory('tourmarkers', ['$http', function ($http) {

    var type;

    var getTourMarkers = function () {
        //var markers = $http.get('https://civilappcsus.herokuapp.com/api/' + this.type);
        var markers = $http.get('http://localhost:8080/api/' + this.type);
        return markers;
    };

    var setTourMarkers = function (type) {
        this.type = type;
    };

    return {
        setTourMarkers: setTourMarkers,
        getTourMarkers: getTourMarkers
    };

}]);

//********************************************* <//Map Services> *********************************************\\