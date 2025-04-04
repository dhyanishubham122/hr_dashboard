const Leave = require("../models/Leave.model.js");
const uploadoncloudinary=require("../config/cloudinary.js");
const Employee =require("../models/Employee.model.js")
const createLeave = async (req, res) => {
    try {
        const { employeeId, leaveDate, reason, designation } = req.body;
        if (!employeeId || !leaveDate || !reason || !designation) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Please upload a document (PDF only)." });
        }
        let pdfUrl = req.file.path ? await uploadoncloudinary(req.file.path) : "";
        if (!pdfUrl) {
            return res.status(400).json({ message: "Document upload failed. Please try again." });
        }

        const newLeave = new Leave({
            employee:employeeId,
            startDate:leaveDate,
            reason,
            designation,
            document: pdfUrl, 
            status: "Pending"
        });

        await newLeave.save();
        
        res.status(201).json({ message: "Leave request created successfully", leave: newLeave });
    } catch (error) {
        console.error("Error in creating leave:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


const updateLeaveStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; 
        
        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }
        
        const leave = await Leave.findByIdAndUpdate(id, { status }, { new: true });
        if (!leave) {
            return res.status(404).json({ message: "Leave request not found" });
        }
        
        res.status(200).json({ message: "Leave status updated", leave });
    } catch (error) {
        console.error("Error in updating leave status:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};



const getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate("employee");
        res.status(200).json(leaves);
    } catch (error) {
        console.error("Error fetching leaves:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const getApprovedLeaves = async (req, res) => {
    try {
        const approvedLeaves = await Leave.find({ status: "Approved" }).populate("employeeId");
        res.status(200).json(approvedLeaves);
    } catch (error) {
        console.error("Error fetching approved leaves:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const deleteLeave = async (req, res) => {
    try {
        const { id } = req.params;
        const leave = await Leave.findByIdAndDelete(id);
        if (!leave) {
            return res.status(404).json({ message: "Leave request not found" });
        }
        res.status(200).json({ message: "Leave request deleted successfully" });
    } catch (error) {
        console.error("Error deleting leave:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
const leavefilter=async(req,res)=>{
    try {
        // filter.status = new RegExp(`^${req.query.status}$`, "i"); // Case-insensitive match
        const filter={};
        if(req.query.Status)
            filter.status=req.query.Status;
        if(req.query.date)
            filter.startDate=req.query.date;
        if(req.query.search){
            const matchingEmployees = await Employee.find({
                name: { $regex: req.query.search, $options: "i" }
              }).select('_id'); // getting the id fo the emplue
            
              const employeeIds = matchingEmployees.map(emp => emp._id);
              filter.employee = { $in: employeeIds };
        }
            // filter.employee=req.query.search;
        // const leaves=await Leave.find(filter).populate("employee");
        const leaves = await Leave.find(filter).populate("employee");

        if(!leaves.length)
            return res.status(200).json({message:"No leaves found"});

      return  res.status(200).json(leaves);
    } catch (error) {
        console.error("Error fetching leaves:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


module.exports = { createLeave, updateLeaveStatus, getAllLeaves, getApprovedLeaves, deleteLeave,leavefilter };
