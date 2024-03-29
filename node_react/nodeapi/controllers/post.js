const Post = require('../models/post')
const formidable = require('formidable')
const fs = require('fs');
const _ =require('lodash')
exports.postById = (req,res,next,id)=>{
    Post.findById(id)
    .populate("postedBy","_id name")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(400).json({
                error:err
            })
        }
        req.post = post;
        next();
    })
}

exports.getPosts = (req,res)=>{
    //res.send('Hello world from node js');
    // res.json({
    //     posts:[{title:"1st post"},{title:"2nd post"}]
    // })
    const post = Post.find()
    .populate('postedBy', '_id name')
    .select('_id title body')
    .then((posts)=>{
        //res.status(200).json({posts:posts})
        res.json({posts})
    })
    .catch(err=>console.log(err));
}

exports.createPost = (req,res)=>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"Image could not be uploaded"
            })
        }
        let post = new Post(fields)

        req.profile.hased_password=undefined
        req.profile.salt=undefined
        post.postedBy = req.profile
        
        if(file.photo){
            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.contentType = files.photo.type
        }
        post.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            res.json(result);
        })
    })
    const post = new Post(req.body);
    post.save()
    .then(result => {
        res.status(200).json({
            post:result
        })
    })
};

exports.postByUser =(req,res)=>{
    Post.find({postedBy:req.profile._id})
        .populate('postedBy','_id name')
        .sort("_created")
        .exec((err,posts)=>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            res.json({posts})
        })        
}

exports.isPoster = (req,res,next)=>{
    let isPosterchk = req.post && req.auth && req.post.postedBy._id == req.auth._id;
    console.log('req.post: ',req.post)
    console.log('req.auth: ',req.auth)
    console.log('req.post.postedBy._id: ',req.post.postedBy._id)
    console.log('req.auth._id: ',req.auth._id)

    if(!isPosterchk)
    {
        return res.status(403).json({
            error:'user is not authorized'
        })
    }
    next();
}

exports.updatePost = (req,res,next)=>{
    let post = req.post;
    post = _.extend(post,req.body)
    post.updated = Date.now()
    post.save((err,post)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.json(post)
    })
}

exports.deletePost = (req,res)=>{
    let post = req.post;
    post.remove((err,post)=>{
        if(err){
            return res.status(400).json({
                error:"error"
            })
        }
        res.json({message:"Post deleted successfully"})
    })
}