const express=require('express')
const feedRouter=require('./routes/feed')
const authRouter=require('./routes/auth')
const app=express()
const bodyParser=require('body-parser')
const { rawListeners } = require('process')
const mongoose =require('mongoose')
const path=require('path')
const multer=require('multer')
const graphqlHttp=require('express-graphql').graphqlHTTP
const graphqlSchema= require('./graphql/schema')
const graphqlResolver= require('./graphql/resolver')
const isAuth = require('./middleware/is-auth');
const fs=require('fs')
const URI='mongodb+srv://sreeramogirala:xetroq-wivVym-1hukja@cluster0.zkqhhtn.mongodb.net/messages'

app.use(bodyParser.json()) //used .urlencoded in the last project


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
    
    app.use((req,res,next)=>{
        res.setHeader('Access-Control-Allow-Origin','*')
        res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
      }
        next()
    })

app.use(isAuth);
app.put('/post-image', (req, res, next) => {
    if (!req.isAuth) {
      throw new Error('Not authenticated!');
    }
    if (!req.file) {
      return res.status(200).json({ message: 'No file provided!' });
    }
    if (req.body.oldPath) {
      clearImage(req.body.oldPath);
    }
    return res
      .status(201)
      .json({ message: 'File stored.', filePath: req.file.path });
  });

app.use('/graphql',graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    formatError(err) {
        if (!err.originalError) {
          return err;
        }
        const data = err.originalError.data;
        const message = err.message || 'An error occurred.';
        const code = err.originalError.code || 500;
        return { message: message, status: code, data: data };
      }
}))

app.use('/feed',feedRouter)
app.use('/auth',authRouter)
 
app.use((error,req,res,next)=>{
    console.log(error);
    const status=error.status || 500
    const message=error.message
    res.status(status).json({message:message})
})

mongoose.connect(URI).then(result=>{

    // const server=
    app.listen(8001)
    // console.log(server);
    // const io = require('./socket').init(server);

    // io.on('connection',socket=>{
    //     console.log('client socket connected');
    // })
    
})
.catch(err=>console.log(err))

const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
  };

//   can actually move the clear image function to a separate dir and import it as we need it need it many places so that we do not reuse the code.