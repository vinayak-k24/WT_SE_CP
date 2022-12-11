const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    gender : {
        type:String,
        required:true
    },
    usn : {
        type : String,
        required: false,
    },
    contactNumber:{
        type:Number,
        required:true,
    },
    registeredEventsIds:[String],
    noOfEventsRegistered:{
        type:Number,
        default:0
    },
    previousEventsConductedIds:[String],
    upcomingEventsConductedIds:[String]
})

const user = mongoose.model('user', schema);

module.exports = user;