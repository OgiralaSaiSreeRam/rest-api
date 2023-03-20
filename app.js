const express=require('express')
const feedRouter=require('./routes/feed')
const authRouter=require('./routes/auth')
const app=express()
const bodyParser=require('body-parser')
const { rawListeners } = require('process')
const mongoose =require('mongoose')
const path=require('path')
const multer=require('multer')

const URI='mongodb+srv://sreeramogirala:xetroq-wivVym-1hukja@cluster0.zkqhhtn.mongodb.net/messages'

app.use(bodyParser.json()) //used .urlencoded in the last project

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization')
    next()
})

const fileStorage=multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'images');
    },
    filename:(req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };
    
    app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'))
app.use('/images',express.static(path.join(__dirname,'images')))

app.use('/feed',feedRouter)
app.use('/auth',authRouter)
app.use((error,req,res,next)=>{
    console.log(error);
    const status=error.status || 500
    const message=error.message
    res.status(status).json({message:message})
})

mongoose.connect(URI).then(result=>{

    app.listen(8001)
})
.catch(err=>console.log(err))