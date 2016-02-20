var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var QuizSchema = new Schema({
    idnum: Number,
    questions: 
        {
            question: String,
			options: [String],
			answer: Number,
            hint : String
        }
    
});

module.exports = mongoose.model('Quiz', QuizSchema);