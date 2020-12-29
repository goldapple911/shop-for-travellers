const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        unique:1
    },
    password:{
        type: String,
        minLength: 5
    },
    lastname: {
        type: String,
        maxLength: 50
    }, 
    role: {
        type: Number,
        default: 0
    },
    token : {
        type: String,
    } ,

    tokenExp:{
        type: Number
    },

})

userSchema.pre('save', (next)=>{
    var user = this;

    if(user.isModified('password')){
        // generate salte
        bcrypt.genSalt(saltRounds, (err, salt)=>{
            if(err) return next(err);

            // make hash password with salt
            bcrypt.hash(user.password, salt, (err, hash)=>{
                if(err) return next(err);
                user.password = hash;
            })
        })
    }else{
        next();
    }
})


const User = mongoose.model("User", userSchema)
module.exports = {User};