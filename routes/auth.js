const express=require('express')
const {body}=require('express-validator')
const authController=require('../controllers/auth')
const user = require('../models/user')

const router=express.Router()

router.put('/signup',[body('email').isEmail().withMessage('Enter a valid email').custom((value,{req})=>{
    return user.findOne({email:value}).then(user=>{
        if(user){
            return Promise.reject('User already exists')
        }
        return true
    })
})
.normalizeEmail(),
body('password').trim().isLength({min:5}),
body('name').trim().not().isEmpty()
],authController.signup)

router.post('/login', authController.login);

module.exports=router