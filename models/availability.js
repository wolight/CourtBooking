var mongoose = require('mongoose');



var availabilitySchema = new mongoose.Schema({
    courtId: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    // 1700 / 1200
    time: {
        type: Number,
        required: true
    },
    
    bookingId: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('availability', availabilitySchema);
