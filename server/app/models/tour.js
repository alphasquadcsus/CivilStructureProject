var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TourSchema = new Schema({
    idnum: Number,
    tourtype: [String],
    title: String,
    ratingssum: Number,
    ratingscount: Number,
    rating: Number,
    icon: String,
    lat: Number,
    lon: Number,
    description: String,
    technicaldescription: String,
    pics: [
        {
            src: String,
            description: String,
            technicaldescription: String
        }
    ]
});

module.exports = mongoose.model('Tour', TourSchema);