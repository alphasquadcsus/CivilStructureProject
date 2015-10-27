var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SingleTour = new Schema({
   
    
});

var TourSchema = new Schema({
    _id: Number,
    tourtype: String,
	title: String,
    rating: Number,
    icon: String,
    link: String,
    description: [{
        main: String,
        picture: String
    }]
});



module.exports = mongoose.model('Tour', TourSchema);