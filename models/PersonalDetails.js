const mongoose = require('mongoose')
const User = require('./Users')

const educationDetailSchema = new mongoose.Schema({
    qualification: {
        type: String,
        required: true,
    },
    since: {
        type: Date,
        required: true,
    },
    to:{
        type: Date
    },
    percentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    completed:{
        type: String,
        enum: ['true', 'false'],
        default: 'false'
    },
})
const PersonalDetailSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    fatherName: {
        type: String,
        required: true
    },
    motherName:{
        type: String,
        required: true,
    },
    street:{
        type: String,
        required: true,
    }, 
    city:{
        type: String,
        required: true,
    },
    state:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    pincode:{
        type: Number,
        required: true,
        maxlength: 6,
    },
    educationDetails: [educationDetailSchema]
})

module.exports = mongoose.model('PersonalDetails', PersonalDetailSchema)