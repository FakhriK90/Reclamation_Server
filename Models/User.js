const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullNameAdmin:{type:String},
    email:{type:String},
    password:{type:String},
    role:{type: String, enum:['admin','client'], default:'client'},
})

module.exports = User = mongoose.model('User', userSchema)