angular.module('app.services', ['ionic'])

//********************************************* <Tour Services> *********************************************\\
//These services retrieve the unique identifier (id #) of the tour, the title, the rating, and icon
//They are used when listing the tours in the tour page, and listing the available quizzes in the quiz page.

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
        setRate: function (id) {
            //return $http.put('https://civilappcsus.herokuapp.com/api/rate/' + id);
            return $http.put('http://localhost:8080/api/rate/' + id)
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
        console.log(questions);
        if (id < questions.length) {
            return questions[id];
        } else {
            return false;
        }
    };

    return {
        getQuestion: getQuestion,
        getQuiz: getQuiz
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