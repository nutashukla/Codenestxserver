const express = require('express')
const app = express()
const authroute = require('./Auth/auth')
const adminauth = require('./Auth/Aauth')
const mongoose=require('mongoose')
require('dotenv').config();
const CreateError=require('http-errors')
const morgan=require('morgan')
var cors=require('cors')
app.use(cors())
const products = require("./Auth/product")

app.use(express.urlencoded({ extended: true }))
// for rest api
app.use(express.json())
// DATABASE CONNECTION
const dbUrl=process.env.URL
mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((result)=>{
    console.log("connected to database")
    app.listen(process.env.PORT,()=>{
        console.log(`listening at port ${process.env.PORT}`)
    })
}).catch((error)=>{
    console.log(error.message)
})
app.use('/admin', adminauth)
app.use('/user', authroute)
app.use('/product', products)

app.use(morgan('dev'))

// authorisation


app.get('/', (req, res, next) => {
    res.send("hello world")
})

// Handeling the error
app.use(async (req, res, next) => {
    const error = new Error("not found")
    error.status = 404
    next(error)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            message: err.message,
            status: err.status
        }
        
    })
    
})