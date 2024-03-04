const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullNameUser:{type:String},
    departement:{type:String},
    salle:{type:String},
    nbPoste:{type:Number},
    panne:{type:String,enum:['materiel','logiciel','autre'], default:'materiel'},
    description:{type:String},
    date:{type:Date, default:Date.now},
    status:{type:String, enum:['en attente', 'en cours', 'resolu'], default:'en attente'}
})

module.exports = Rec = mongoose.model('Rec', userSchema)