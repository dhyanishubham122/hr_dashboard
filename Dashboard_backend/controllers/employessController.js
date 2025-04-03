const mongoose=require('mongoose');
const Employee= require('../models/Employee.model.js');
const Candidate=require('../models/Candidate.model.js');
const uploadoncloudinary=require("../config/cloudinary.js");

const candidate_to_employee=async(req,res)=>{
    try {
       
        const {id}=req.params;
        const {status}=req.body;
        const candidate=await Candidate.findById(id);
        if(!candidate){
            return res.status(404).json({message:'Candidate not found'});
            }
            // if (candidate.status !== "Selected" || status!=="Selected") {
            //     return res.status(400).json({ message: "Only selected candidates can be moved to employees", canditae:candidate.status });
            // }
            const existingEmployee = await Employee.findOne({ email: candidate.email });

            if (existingEmployee) {
                return res.status(400).json({ message: "Employee already exists" });
            }
            const newEmployee =new Employee({
                profile:"",
                name:candidate.name,
                email:candidate.email,
                phone:candidate.phone,
                position:candidate.position,
                Joining_Date: new Date(),
                department: "Not Assigned", // Default department
            });
            await newEmployee.save();
            res.status(200).json({message:"candidate becomes employee",newEmployee});

    } catch (error) {
        console.log(`Internal Server Error during adding C to E : ${error.message}`);
        res.status(500).send({ message: "Internal Server Error" });
    }
}
const deleteEmployee=async(req,res)=>{
    try {
        const {id}=req.params;
        const employee=await Employee.findById(id);
        if(!employee){
            return res.status(404).json({message:'Employee not found'});
            }
            await Employee.findByIdAndDelete(id);
        res.status(201).json({message:"Employess Deleted succssfully"});
    } catch (error) {
        console.log(`Internal Error in deletting the ${error.message}`);
    }
}
const allemployees=async(req,res)=>{
    try {
        const employee= await Employee.find({});
        if(employee.length===0){
            return res.status(201).json({message:'No Employees found'});
        }
        return res.status(200).json(employee);
    } catch (error) {
        console.log(`Internal error in fetching all employess : ${error.message}`);
       return res.status(500).json({message:"Internal server error",error:error.message});

    }
}
const employeefilter=async(req,res)=>{
    try {
        const filters={};
        if(req.query.position) filters.position=req.query.position;
        if(req.query.status) filters.status=req.query.status;
        if (req.query.search) {
            filters.$or = [
                { name: { $regex: req.query.search, $options: "i" } },  
                { email: { $regex: req.query.search, $options: "i" } }
            ];
        }
        const employee=await Employee.find(filters);
        if(employee.length===0){
            return res.status(200).json({message:'No Employees found'});
            }
            return res.status(200).json(employee);
    } catch (error) {
        console.log(`Internal error in filtering the employess : ${error.message}`);
        return res.status(500).json({message:"Internal server error",error:error.message});
    }
}
const updateemployess = async (req, res) => {
    try {
        const { id } = req.params;  
   console.log("employee is sis :",id);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid employee ID" , id:id});
        }

        const { name, email, phone, department, position, Joining_Date } = req.body;

        let employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        let image = employee.profile;
        if (req.file) {
            image = req.file.path ? await uploadoncloudinary(req.file.path) : "";  
            if (!image) {
                return res.status(400).json({ message: "Error uploading profile image" });
            }
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            {
                name: name || employee.name,
                email: email || employee.email,
                phone: phone || employee.phone,
                department: department || employee.department,
                position: position || employee.position,
                Joining_Date: Joining_Date || employee.Joining_Date,
                profile: image
            },
            { new: true }  
        );

        return res.status(200).json({ message: "Employee updated successfully", updatedEmployee });

    } catch (error) {
        console.error(`Internal error in updating the employees: ${error.message}`);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
module.exports={candidate_to_employee,deleteEmployee,allemployees,updateemployess,employeefilter};