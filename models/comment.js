var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    courtId:{
    	type:Number,
    	required: true
    },
    firstname: {
        type: String,
        requried: true
    },
    lastname:{
    	type:String,
    	required: true
    },
    content: {
    	type: String,
    	unique:true
    },
    date: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('comments', commentSchema);
