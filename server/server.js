var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

var mongoose = require('mongoose');
mongoose.connect('mongodb://73.41.74.242:27017/CivilApp'); // connect to our database
var Tour = require('./app/models/tour');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /tours
// ----------------------------------------------------
router.route('/tours')
	// create a tour (accessed at POST http://localhost:8080/tours)
	.post(function(req, res) {
		var tour = new Tour();		// create a new instance of the Tour model
        tour.Id = req.body.Id;
        tour.tourtype = req.body.tourtype;
		tour.title = req.body.title;
        tour.rating = req.body.rating;
        tour.icon = req.body.icon;
        tour.link = req.body.link;
        tour.description = req.body.description;

		tour.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Tour created!' });
		});
	})

	// get all the tours (accessed at GET http://localhost:8080/api/tours)
	.get(function(req, res) {
		Tour.find(function(err, tours) {
			if (err)
				res.send(err);

			res.json(tours);
		});
	});

router.route('/concretetours')
	.get(function(req, res) {
		Tour.find({'tourtype': "concrete"}, function(err, tours) {
			if (err)
				res.send(err);
			res.json(tours);
		});
	});

router.route('/connectionstours')
	.get(function(req, res) {
		Tour.find({'tourtype': "connections"}, function(err, tours) {
			if (err)
				res.send(err);
			res.json(tours);
		});
	});

router.route('/lateraltours')
	.get(function(req, res) {
		Tour.find({'tourtype': "lateral"}, function(err, tours) {
			if (err)
				res.send(err);
			res.json(tours);
		});
	});

router.route('/steeltours')
	.get(function(req, res) {
		Tour.find({'tourtype': "steel"}, function(err, tours) {
			if (err)
				res.send(err);
			res.json(tours);
		});
	});

router.route('/timbertours')
	.get(function(req, res) {
		Tour.find({'tourtype': "timber"}, function(err, tours) {
			if (err)
				res.send(err);
			res.json(tours);
		});
	});

// on routes that end in /tours/:tour_id
// ----------------------------------------------------
router.route('/tours/:tour_id')

	// get the tour with that id
	.get(function(req, res) {
		Tour.findById(req.params.tour_id, function(err, tour) {
			if (err)
				res.send(err);
			res.json(tour);
		});
	})

	// update the tour with this id
	.put(function(req, res) {
		Tour.findById(req.params.tour_id, function(err, tour) {

			if (err)
				res.send(err);

			tour.name = req.body.name;
			tour.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Tour updated!' });
			});

		});
	})

	// delete the tour with this id
	.delete(function(req, res) {
		Tour.remove({
			_id: req.params.tour_id
		}, function(err, tour) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);


/*db.tours.insert(
{
    _id: "12",
    tourtype: "concrete",
    title: "TEST",
    icon: "img/concreteicon.png",
    rating: 2.4,
    link: "#",
    description:{
        main: "test",
        picture: "test.jpb"
    }
  }
)*/