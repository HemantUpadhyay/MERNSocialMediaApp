const express = require('express')
const {getPosts, createPost,postByUser,postById,isPoster,deletePost,updatePost} = require('../controllers/post');
const {requireSignin} = require('../controllers/auth');
const {userById} = require('../controllers/user');
const {createPostValidators} = require('../validator')
const router = express.Router()

router.get('/posts',getPosts);
router.post('/post/new/:userId',requireSignin,createPost,createPostValidators);
router.get('/post/by/:userId',requireSignin,postByUser);
router.delete('/post/:postId',requireSignin,isPoster,deletePost);
router.put('/post/:postId',requireSignin,isPoster,updatePost);
//any routes containing userId, our app will 1st execute userBYID()
router.param('userId',userById);
router.param("postId",postById)

// router.get('/',postController.getPosts);
// router.post('/post',validator.createPostValidators,postController.createPost);

// const getPosts = (req,res)=>{
//     res.send('Hello world from node js');
// }

// module.exports={
//     getPosts
// }

//Alternate way to write same above  code 
// exports.getPosts = (req,res)=>{
//     //res.send('Hello world from node js');
//     //
// }



module.exports=router;