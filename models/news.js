var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new Schema({
    news_title: {
        type: String,
        requried: true
    },
    des: String,
    date: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('news', newsSchema);
