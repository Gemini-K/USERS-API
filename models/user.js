const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id : {
        required:true,
        type: String
    },
    name : {
        required: true,
        type : String
    },
    username : {
        required: true,
        type : String,
    },
    email: {
        required: true,
        type: String,
    },
    address: {
        required:false,
        type: Object
    },
    phone: {
        required: true,
        type: String
    },
    website: {
        required: false,
        type:String
    },
    company: {
        required: false,
        type: Object
    }

 });

 module.exports = mongoose.model('User', userSchema)