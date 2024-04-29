
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cart = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type:Number ,
        required: true
    },
    price:{
        type:String,
        required:true
    },
    image:{
        type: String,
        required:true
    }
})

const Mycart = mongoose.model('Product', cart)
module.exports = Mycart