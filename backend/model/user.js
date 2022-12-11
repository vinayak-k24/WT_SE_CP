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
    department:{
        type:String,
        required:true
    },
    semester : {
        type:Number,
        required:true
    },
    usn : {
        type : String,
        required: false,
        unique : true
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    registeredEventsIds:[String],
    organizedEventIds: {
        type:[String],
        required:false
    },
    userType:{
        type:String,
        required:true,
        default:"user"
    }
})

const user = mongoose.model('user', schema);

module.exports = user;