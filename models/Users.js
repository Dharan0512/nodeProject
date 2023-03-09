const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
       required: [true, 'Please Provide name'],
    },
    emailId: {
        type: String,
        required: [true, "Please Provide email"],
        validator: {
            validate: validator.isEmail,
            message: "Please provide a valid email"
        }
    },
    phoneNumber : {
         type: Number,
         required: [true, 'Please Provide phoneNumber'],
    },
    password: {
         type: String,
         required: [true, 'Please Provide Password'],
         minlength: 6,
         select: false

    },
    type: {
        type: String,
        enum: ['Email','Google','Facebook'],
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['Executive Officer', 'Joint', 'Joint managing Director', 'Managing Director']
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    }
})

UserSchema.pre('save', async function(){
    if(!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function(){
    return jwt.sign({userId: this.id},'secret',{
        expiresIn: '24d'
    })
}

UserSchema.methods.comparePassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch
}

module.exports = mongoose.model('Users',UserSchema)