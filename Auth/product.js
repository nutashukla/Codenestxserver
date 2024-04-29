const express = require('express')
const router = express.Router()
const CartSchema = require("../SchmaModels/CartSchema") 
const Admins = require('../SchmaModels/Adscmodels')



router.get('/getproductlist', async (req, res, next) => {
    const Products = await CartSchema.find();
    return res.status(200).json({ code: 200, status: true, message: Products })
})
router.get('/getproduct', async (req, res, next) => {
    const { productId } = req.query;
    if(!productId)return res.status(400).json({ code: 400, status: false, message: "Product Id is required" })
    const Products = await CartSchema.findById({_id: productId});
    res.status(200).json({ code: 200, status: true, message: Products })
})
router.post('/updateproduct', async (req, res, next) => {
    const {productId, name, quantity, price, image } = req.body;
    if(!productId)return res.status(400).json({ code: 400, status: false, message: "Product Id is required" })
    const Products = await CartSchema.findByIdAndUpdate ({ _id: productId }, {name, quantity, price, image}, { new: true });
    res.status(200).json({ code: 200, status: true, message: Products })
})
router.post('/deleteproduct', async (req, res, next) => {
    const {productId} = req.body;
    if(!productId)return res.status(400).json({ code: 400, status: false, message: "Product Id is required" })
    const Products = await CartSchema.findByIdAndDelete ({ _id: productId });
    res.status(200).json({ code: 200, status: true, message: "Product Deleted Successfully" })
})

router.post('/addproduct', async (req, res, next) => {
    try{
    const { userId, name, quantity, price, image} = req.body;
    const user = await Admins.findOne({_id: userId});
    if(!user)return res.status(400).json({ code: 400, status: false, message: "permission denied" })
    const newProduct = await CartSchema.create({ name, quantity, price, image})
    return res.status(200).json({ code: 200, status: true, message: newProduct })
    }catch (error) {
        res.send(error)
        next(error)
    }
})

module.exports = router