const jwt = require('jsonwebtoken')
require('dotenv').config();
const expressJwt = require('express-jwt')
const User = require('../models/user');

exports.signup = async (req,res)=>{
    const userExists = await User.findOne({email: req.body.email})
    if(userExists) return res.status(430).json({
        error: "Email is taken!"
    })

    const user = await new User(req.body)
    await user.save()
    res.status(200).json({
        message:"Singhup success! Please login."
    })
};

exports.signin = (req,res)=>{
    //find the user based on email
    const {email, password} = req.body;
    User.findOne({email},(err,user)=>{
        //iff err or no user
        if(err || !user)
        {
            return res.status(401).json({
                error:'User with that email does not exist. Please singh up'
            })
        }
        //if user is found make sure, the email and password match
        //create authenticate method in model and use here
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:'Email and Password do not match'
            })
        }

        //generate a token with userId and secret
        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET);

        //persist the token as 't' in cookie to frontend client
        res.cookie('t',token,{expire:new Date() + 9999});
        
        //return response with user and tokento frontend client
        const {_id, name , email} = user;
        return res.json({token, user:{_id, name ,email}});
    })
}

exports.signout = (req,res)=>{
    res.clearCookie('t');
    return res.status(200).json({message:'signout success!'});
}

exports.requireSignin = expressJwt({
    //if the token is valid, express-jwt appends the verified user id in an auth key to required post
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: "auth"
});