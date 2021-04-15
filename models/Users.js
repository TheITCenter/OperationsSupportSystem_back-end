const mongoose = require('mongoose');
const {Schema} = mongoose;
//const Users =require('../models/Users');

const UserSchema = new Schema({
    name:String,//shorthand
    lastName:String,//shorthand
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:String,
    rol:String
},{timestamps:true})

//convertir a modelo

const Users= mongoose.model('users',UserSchema)

module.exports = Users;