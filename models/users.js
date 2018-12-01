var mongoose = require('mongoose');
var crypto = require('crypto');

var userSchema = new mongoose.Schema({

    studentNum: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNum: {
        type: Number
    },
    admin: {
        type: Boolean
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: ""
    },


    hash: String,
    salt: String
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};


module.exports = mongoose.model('user', userSchema);