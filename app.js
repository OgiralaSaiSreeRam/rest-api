const express=require('express')
const feedRouter=require('./routes/feed')
const app=express()
const bodyParser=require('body-parser')
const { rawListeners } = require('process')

app.use(bodyParser.json()) //used .urlencoded in the last project


app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization')
    next()
})

app.use('/feed',feedRouter)
app.listen(8001)