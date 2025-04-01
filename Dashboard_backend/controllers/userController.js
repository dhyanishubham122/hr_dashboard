const User=require('../models/User.model.js');
const bcrypt = require('bcrypt');

const userProfile=(req,res)=>{
   try {
     const {id}=req.params;
    const user=User.findById(id);
    if(!user){
     return res.status(404).json({message:'User not found'});
     }
     return res.status(200).json(user);
   } catch (error) {
    console.error("Error in fetching profile:", error.message);
    return res.status(500).json({ message: "Internal server error in fetching profile" });
   }
}

const profileUpdate=async(req,res)=>{
   try {
     const {id}=req.params;
     const {name,email,currentpassword,newpassword}=req.body;
     const user= await User.findById(id).select("+password");;
     if(!user){
         return res.status(404).json({message:'User not found'});
     }
      const isValid=await bcrypt.compare(currentpassword,user.password);
      if(!isValid){
         return res.status(401).json({message:'Invalid current password'});
         }
 
     let image = user.profile;
     if(req.file){
         image = req.file.path ? await uploadoncloudinary(req.file.path) : "";  
         if (!image) {
             return res.status(400).json({ message: "Error uploading profile image" });
         }
     }
     const updateprofile=await User.findByIdAndUpdate(id,{
                 name: name || user.name,
                 email: email || user.email,
                 phone: phone || user.phone,
                 profile: image || user.profile,
                 password:newpassword|| user.password
     })
     return res.status(200).json({ message: "Profile updated successfully" });
   } catch (error) {
    console.error("Error updating profile:", error.message);
        return res.status(500).json({ message: "Internal server error in profile updation" });
   }
}

module.exports={userProfile,profileUpdate}