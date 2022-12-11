const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    eventName : {
        type : String,
        required: true
    },
    eventDescription : {
        type : String,
        required: true
    },
    coordinatorName : {
        type: String,
        required: true,
    },
    coordinatorEmail : {
        type: String,
        required: true,
    },
    coordinatorNumber : {
        type: Number,
        required: true,
    },
    venue:{
        type:String,
        required:true
    },
    noOfPeopleEstimated:{
        type:Number,
        required:true
    },
    fromDateTime:{
        type:Date,
        required:true
    },
    toDateTime:{
        type:Date,
        required:true
    },
    guestName:{
        type:String,
        required:true
    },
    organizerName:{
        type:String,
        required:true
    },
    organizerEmail:{
        type:String,
        required:true
    },
    eventType:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
})

const event = mongoose.model('event', schema);

module.exports = event;