var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var NewsSchema = new Schema({
    username: String,
    date: String,
    icon: String,
    picture: String,
    post: String
});


module.exports = mongoose.model('News', NewsSchema);