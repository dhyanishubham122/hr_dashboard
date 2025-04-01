const User=require('../models/User.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {isValidEmail,isValidPassword,validatePassword}=require('../validators/authValidators.js');
const generateToken=require('../utils/generatetoken.js');
const signup=async(req,res)=>{
 try {
     let {name,email,password,confirmpassword}=req.body;
     email = email?.trim().toLowerCase();
   
     if(!name||!email||!password||!confirmpassword){
       return res.status(400).json({message:"Please fill all the fields"});
       }
       if(!isValidEmail(email)){
           return res.status(400).json({message:"Invalid email"});
       }
       if (!isValidPassword(password)) {
           return res.status(400).json({
               message: "Password must be at least 8 characters long, with 1 uppercase, 1 lowercase, 1 number, and 1 special character."
           });
       }
       if(password!==confirmpassword){
           return res.status(400).json({message:"Passwords don't match"});
           }
       const user = await User.findOne({email:email});
       if(user){
           return res.status(400).json({message:"Email already exists"});
           }
           const hashedPassword = await bcrypt.hash(password,10);
           const newUser = new User({
               name:name,
               email:email,
               password:hashedPassword,
               role: "HR"
               });
               await newUser.save();
               res.status(201).json({ message: "User created successfully" });                   
   
 } catch (error) {
    console.log(`Internal server error in signup ${error.message}`);
    res.status(500).json({ message: "Internal server error" ,error:error.message});
 }}

const login=async(req,res)=>{
    try {
        let {email,password}=req.body;
        email = email?.trim().toLowerCase();
        if(!email||!password){
            return res.status(400).json({message:"Please fill all the fields"});
            }
            const user = await User.findOne({email:email}).select("+password");;
            if(!user){
                return res.status(400).json({message:"Invalid email or password"});
                }
            const isValid = await validatePassword(password, user.password);
                if (!isValid) {
                  return res.status(400).json({ message: "Invalid email or password" });
                 }
                 const accessToken = generateToken(user);
    
    res.status(200).json({ message: "User logged in successfully" , accessToken});

    } catch (error) {
        console.log(`error in login : ${error.message}`);
        res.status(500).json({ message: "Internal server error" ,error:error.message});
    }
} 



module.exports={signup,login};