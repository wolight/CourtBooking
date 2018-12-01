var mongoose = require('mongoose');

var bookingSchema = new mongoose.Schema({
    studentNum: {
        type: Number,
        required: true
    },
    courtId: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    starttime: {
        type: String,
        required: true
    },
    endtime: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('booking', bookingSchema);
