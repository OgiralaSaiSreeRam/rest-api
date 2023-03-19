const express=require('express')

const router=express.Router()
const FeedController=require('../controllers/feed')

router.get('/posts',FeedController.getPosts)
router.post('/post',FeedController.postPosts)

module.exports=router