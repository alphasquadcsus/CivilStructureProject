var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var passport = require('passport');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(passport.initialize());

var port = process.env.PORT || 8080; // set our port

var mongoose = require('mongoose');
mongoose.connect('mongodb://rick:omglol@73.41.74.242:27017/CivilApp'); // connect to our database
var Tour = require('./app/models/tour');
var Quiz = require('./app/models/quizzes');
var User = require('./app/models/users');
var Passport = require('./config/passport');


// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // do logging
    console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({
        message: "I'm up!"
    });
});

router.post('/register', function (req, res, next) {

    if (!req.body.username || !req.body.password || !req.body.password2) {
        return res.status(400).json({
            message: 'Please fill out all fields!'
        });
    }

    if (req.body.password !== req.body.password2) {
        return res.status(400).json({
            message: 'Passwords do not match!'
        });
    }

    if (req.body.password.length < 6) {
        return res.status(400).json({
            message: 'Password must be at least 6 characters!'
        });
    }

    if (req.body.username.length < 6) {
        return res.status(400).json({
            message: 'Username must be at least 6 characters!'
        });
    }

    var user = new User();
    user.username = req.body.username;
    user.type = req.body.type;
    if (user.type == "student")
        user.course = req.body.course;
    if (user.type == "professional")
        user.company = req.body.company;
    user.setPassword(req.body.password);

    user.save(function (err) {
        if (err) {
            return next(err);
        }

        return res.json({
            token: user.generateJWT()
        });
    });
});

router.post('/login', function (req, res, next) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            message: 'Please fill out all fields'
        });
    }

    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (user) {
            return res.json({
                token: user.generateJWT()
            });
        } else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});

// on routes that end in /tours
router.route('/tours')

.get(function (req, res) {
    Tour.find({}, function (err, tours) {
        if (err)
            res.send(err);
        res.json(tours);
    });
});

router.route('/shorttours')
    .get(function (req, res) {
        Tour.find({
            'tourtype': "short"
        }, ('idno title rating icon lat lon'), function (err, tours) {
            if (err)
                res.send(err);
            res.json(tours);
        });
    });

router.route('/concretetours')
    .get(function (req, res) {
        Tour.find({
            'tourtype': "concrete"
        }, ('idno title rating icon lat lon'), function (err, tours) {
            if (err)
                res.send(err);
            res.json(tours);
        });
    });

router.route('/connectionstours')
    .get(function (req, res) {
        Tour.find({
            'tourtype': "connections"
        }, ('idno title rating icon lat lon'), function (err, tours) {
            if (err)
                res.send(err);
            res.json(tours);
        });
    });

router.route('/lateraltours')
    .get(function (req, res) {
        Tour.find({
            'tourtype': "lateral"
        }, ('idno title rating icon lat lon'), function (err, tours) {
            if (err)
                res.send(err);
            res.json(tours);
        });
    });

router.route('/steeltours')
    .get(function (req, res) {
        Tour.find({
            'tourtype': "steel"
        }, ('idno title rating icon lat lon'), function (err, tours) {
            if (err)
                res.send(err);
            res.json(tours);
        });
    });

router.route('/timbertours')
    .get(function (req, res) {
        Tour.find({
            'tourtype': "timber"
        }, ('idno title rating icon lat lon'), function (err, tours) {
            if (err)
                res.send(err);
            res.json(tours);
        });
    });

// on routes that end in /tours/:tour_id
// ----------------------------------------------------
router.route('/tours/:tour_id')

//get the tour with that id (accessed at GET http://localhost:8080/api/tours/:tour_id)
.get(function (req, res) {
    Tour.find({
        '_id': req.params.tour_id
    }, ('_id idno tourtype title rating technical description technicaldescription pics'), function (err, tour) {
        if (err) {
            res.send(err);
        }
        res.json(tour);
    });
});

//Rate a tour
router.route('/rate/:tour_id')
    .put(function (req, res) {
        Tour.find({
            'idno': req.params.tour_id
        }, ('ratingssum ratingscount rating'), function (err, tour) {
            if (err || req.body.ratings < 1 || req.body.ratings > 5) {
                res.send(err);
                return;
            }
            tour[0].ratingssum += req.body.ratings;
            tour[0].ratingscount ++;
            tour[0].rating = tour[0].ratingssum / tour[0].ratingscount;
            tour[0].save(function (err) {
                if (err)
                    res.send(err);
                res.json({
                    message: 'Rating submitted!'
                });

            });
        });
    });

// on routes that end in /quizzes/:quiz_id
router.route('/quizzes/:quiz_id')
//get the quiz with that id (accessed at GET http://localhost:8080/api/quizzes/:quiz_id)
.get(function (req, res) {
    Quiz.find({
        '_id': req.params.quiz_id
    }, ('idno questions'), function (err, quiz) {
        if (err)
            res.send(err);
        
        res.json(quiz);
    });
});

router.route('/user/:username')
    .put(function (req, res) {
        User.find({
            'username': req.params.username
        }, ('date, quizId, score, total, course'), function (err, user) {
            user[0].quizzes = req.body;
            user[0].quizzes.push(req.body);
            user[0].save(function (err) {
                if (err)
                    res.send(err);
                res.json({
                    message: 'Quiz submitted!'
                });

            });
        });
    });

// REGISTER OUR ROUTES
app.use('/api', router);

app.listen(port);
console.log('Server started on port ' + port);