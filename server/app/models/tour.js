var mongoose = require('mongoose');
var Schema = mongoose.Schema;
    //ObjectId = Schema.ObjectId;


var TourSchema = new Schema({
    idnum: Number,
    //idnum: ObjectId,
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