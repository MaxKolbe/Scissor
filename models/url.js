const mongoose = require("mongoose")
const shortid = require("shortid")
const urlSchema = new mongoose.Schema({
    long:{
        type: String,
        required: true
    },
    short:{
        type: String,
        default: shortid.generate
    },
    clicks:{
        type: Number,
        default: 0,
        required: true 
    },
    real:{
        type: Number,
        default: 2,
        required: true 
    },
    ipaddress:{
        type: String,
        default: " ",
        required: true 
    }
})

module.exports = mongoose.model("url", urlSchema)