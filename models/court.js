// autoIncrement setting from npm mongoose-auto-increment
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost:27017/courtbooking");
autoIncrement.initialize(connection);
var Schema = mongoose.Schema;
var courtSchema = new Schema({
    courtName: {
        type: String,
        requried: true
    },
    description: String,
    location: String,
    policy: String,
    photo: String
});

courtSchema.plugin(autoIncrement.plugin, 'courts');
module.exports = mongoose.model('courts', courtSchema);
