const express=require('express')

const {body} = require('express-validator')
const isAuth = require('../middleware/is-auth');
const router=express.Router()
const FeedController=require('../controllers/feed')

router.get('/posts',isAuth,FeedController.getPosts)
router.post('/post',[body('title').trim().isLength({min:5}),
                    body('content').trim().isLength({min:5})],isAuth,FeedController.createPost)

router.get('/post/:postId', isAuth,FeedController.getPost);

router.put(
    '/post/:postId',
    [
      body('title')
        .trim()
        .isLength({ min: 5 }),
      body('content')
        .trim()
        .isLength({ min: 5 })
    ],
    isAuth,FeedController.updatePost
  );

  router.delete('/post/:postId', isAuth,FeedController.deletePost);

module.exports=router