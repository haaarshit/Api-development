const mongoose = require('mongoose')

const Schema = mongoose.Schema

const refreshSchema = new Schema({
    token:{
        type:String,
        required:true ,
        unique:true
        }
    })

const RefreshToken = mongoose.model('RefreshToken',refreshSchema)
module.exports = RefreshToken

