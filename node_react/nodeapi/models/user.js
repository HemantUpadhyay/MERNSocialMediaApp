//const uuid = require('uuid');
const mongoose = require('mongoose')
const {v1: uuidv1} = require('uuid')
const crypto = require('crypto');
const {ObjectId} = mongoose.Schema;
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
    },
    hased_password:{
        type:String,    
        required:true,
    },
    salt:String,
    created:{
        type:Date,
        default:Date.now
    },
    updated:Date,
    photo: {
        data:Buffer, 
        contentType:String
    },
    about:{
        type:String,
        trim:true
    },
    following : [{type:ObjectId, ref : "User"}],
    followers : [{type:ObjectId, ref : "User"}]
});

/**
 * Virtual fields are additional feilds for a given model
 * Their value can be set manually or automatically with defined functionality
 * Keep in mind: virtual properties (password) don't get persisted in the DB.
 * They only exist logically and are not written to the documant's collection
*/

//Virtual feild
userSchema.virtual('password')
.set(function(password){
    //create temp varibale called _password
    this._password = password
    //genereate a timestamp using uuid
    this.salt = uuidv1();
    //encryptpassword()
    this.hased_password = this.encryptPassword(password);
})
.get(function(){
    return this._password;
})

//methods
userSchema.methods={
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hased_password
    },

    encryptPassword: function(password){
        if(!password)
        {
            return "";
        }
        try{
            return crypto.createHmac('sha1',this.salt)
                    .update(password)
                    .digest('hex')
        }catch(err){
            return '';
        }
    }
}

module.exports = mongoose.model('User',userSchema);










