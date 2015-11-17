var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TourSchema = new Schema({
    idnum: Number,
    tourtype: String,
    title: String,
    rating: Number,
    icon: String,
    lat: Number,
    lon: Number,
    description: String,
    technical: String,
    pics: [
        {
            src: String
        },
        {
            src: String
        },
        {
            src: String
        },
        {
            src: String
        }
    ]
});


module.exports = mongoose.model('Tour', TourSchema);