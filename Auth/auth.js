const express = require('express')
const router = express.Router()
const Users = require('../SchmaModels/schmdls')
const Mycart = require('../SchmaModels/CartSchema')

router.post('/register', async (req, res, next) => {
    try {
        
         const { name, email, password, phoneNumber} = req.body;
         const newUsers = await Users.create({ name, email: email.toLowerCase(), password, phoneNumber });
         return res.status(200).json({ code: 200, status: true, message: newUsers })
    }
    catch (error) {
        res.send(error)
        next(error)
    }

})

router.post('/login', async (req, res, next) => {
    try {
        const {email, password}= req.body
        const user = await Users.findOne({ email: email })

        const domatch = await user.isValidPassword(password)
        if (!domatch)return res.status(400).json({ code: 400, status: false, message: "invalid password" })
        return res.status(200).json({ code: 200, status: true, message: user })
    
    }
    catch (error) {
        res.send(error)
        next(error)
    }
})


module.exports = router