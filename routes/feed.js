const express=require('express')

const {body} = require('express-validator')

const router=express.Router()
const FeedController=require('../controllers/feed')

router.get('/posts',FeedController.getPosts)
router.post('/post',[body('title').trim().isLength({min:5}),
                    body('content').trim().isLength({min:5})],FeedController.postPosts)

module.exports=router