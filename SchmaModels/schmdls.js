const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const Userdata = new Schema({
    name: {
        type: String,
        required: true
    }
    , email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true ,
        unique: true
    }

})

Userdata.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashpass = await bcrypt.hash(this.password, salt)
        // const chashpass = await bcrypt.hash(this.cpassword, salt)
        this.password = hashpass
        // this.cpassword = chashpass
        next()
    }
    catch (error) {
        next(error)
    }
})
Userdata.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    }
    catch (error) {
        throw (error)
    }
}


const Users = mongoose.model('Users', Userdata)
module.exports = Users