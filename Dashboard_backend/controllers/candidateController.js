const mongoose=require('mongoose');
const Candidate=require('../models/Candidate.model.js');
const uploadoncloudinary=require("../config/cloudinary.js");
const path = require("path");
const fs = require("fs");



const addCandidate=async(req,res)=>{
   try {
     const {name,email,phone,position,experience}=req.body;
      const candidate= await Candidate.findOne({email:email});
      if(candidate){
         return res.status(400).json({message:"Candidate already exists"});
      }
     if(!req.file){
         return res.status(400).json({message:"Please upload a Resume  as pdf"});
     }
     let pdfUrl = req.file.path ? await uploadoncloudinary(req.file.path) : "";
     if (!pdfUrl) {
         return res.status(400).json({ message: " PDF are required." });
       }
       const newCandidate=new Candidate({
         name:name,
         email:email,
         phone:phone,
         position:position,
         experience:experience,
         resume:pdfUrl
         });
         await newCandidate.save();
         res.status(201).json({message:"Candidate Added Successfully"});
   } catch (error) {
       console.log(`Internal server in adding new candidate${error}`);
       return res.status(500).json({message:"Internal server error",error:error.message});
   }
}
const deleteCandidate=async(req,res)=>{
    try {
        const {id}=req.params;
        const candidate=await Candidate.findByIdAndDelete(id);
        if(!candidate){
            return res.status(404).json({message:"Candidate not found"});
            }
            res.status(200).json({message:"Candidate deleted successfully"});

    } catch (error) {
        console.log(`Internal server error in deleting candidate ${error.message}`);
        return res.status(500).json({message:"Internal server error",error:error.message});
    }
}
const updateCandidate=async(req,res)=>{
    try {
        const {status}=req.body;
        const {id}=req.params;
        const validStatuses = ["New", "Scheduled", "Ongoing", "Selected", "Rejected"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }
        const candidate=await Candidate.findByIdAndUpdate(id,{status:status},{new:true});
        if(!candidate){
            return res.status(404).json({message:"Candidate not found"});
            }
            res.status(200).json({message:"Candidate updated successfully"});
    } catch (error) {
        console.log(`Internal servore error in updating candidate Status ${error.message}`);
        return res.status(500).json({message:"Internal server error",error:error.message});
    }
}
const candidateResume=async(req,res)=>{
    try {
        const {id}=req.query;
        const candidate=await Candidate.findById(id);
        console.log(candidate);
        if(!candidate || !candidate.resume){
            return res.status(404).json({message:"Candidate not found"});
            }
            return res.status(200).json({ resumeUrl: candidate.resume });
        } catch (error) {
        console.log(`Internal servor error in downloading resume ${error.message}`);
        return res.status(500).json({message:"Internal server error",error:error.message});
    }
}
// /controllers for filter
const candidateFilter=async(req,res)=>{
    try {
        const filters={};
        if(req.query.status) filters.status=req.query.status;
        if (req.query.position) filters.position = req.query.position;
        if (req.query.search) {
            filters.$or = [
                { name: { $regex: req.query.search, $options: "i" } },  
                { email: { $regex: req.query.search, $options: "i" } }
            ];
        }
        const candidate=await Candidate.find(filters);
        if(!candidate){
            return res.status(404).json({message:"Candidate not found"});
            }
          return res.status(200).json(candidate);
    } catch (error) {
        console.log(`Internal Server Error:${error.message}`);
       return res.status(500).json({message:"Internal server error",error:error.message});
    }
}
const allcandidate=async(req,res)=>{
    try {
        const candidate =await Candidate.find({});
        if(!candidate){
            return res.status(404).json({message:"Candidate not found"});
            }
        res.status(200).json(candidate);
    } catch (error) {
        console.log(`Internal servor error in fetching all candidate ${error.message}`);
        return res.status(500).json({message:"Internal server error",error:error.message});

    }
}

module.exports={addCandidate,deleteCandidate,updateCandidate,candidateResume,candidateFilter,allcandidate};