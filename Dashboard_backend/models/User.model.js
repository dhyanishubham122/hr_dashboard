const mongoose=require('mongoose');
const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        },
    password:{
        type:String,
        required:true,
        minlength:8,
        select:false
    },
    role:{
        type:String,
        enum:['Employee','HR'],
        default:'HR',
    },
    isActive:{
        type:Boolean,
        default:true,
    },  
},{
    timestamps:true,
});
const User=mongoose.model("User",UserSchema);
module.exports=User;