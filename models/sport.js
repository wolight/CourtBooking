var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sportSchema = new Schema({
    courtId:{
    	type: Number,
    	required: true
    },
    sportName:String
});

module.exports = mongoose.model('sports', sportSchema);
