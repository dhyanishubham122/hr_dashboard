const Attendance=require('../models/Attendence.model.js');
const Employee=require('../models/Employee.model.js');
const uploadoncloudinary=require("../config/cloudinary.js");
const markAttendance = async (req, res) => {
    try {
        const { employeeId, status } = req.body;
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        const today = new Date().toISOString().split("T")[0];

        const existingRecord = await Attendance.findOne({ employeeId, date: today });

        if (existingRecord) {
            return res.status(200).json({ message: "Attendance already marked for today" });
        }
        const attendance = new Attendance({
            employeeId,
            status: status || "Present", 
            date: today, 
        });

        await attendance.save();
        res.status(201).json({ message: "Attendance marked successfully", attendance });
    } catch (error) {
        console.log(`Error in marking attendance: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAllAttendance = async (req, res) => {
    try {
        const records = await Attendance.find().populate("employeeId", "name email position profile");
        res.status(200).json(records);
    } catch (error) {
        console.log(`Error fetching attendance records: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getEmployeeAttendance = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const records = await Attendance.find({ employeeId }).populate("employeeId", "name email position");
        
        if (records.length === 0) {
            return res.status(404).json({ message: "No attendance records found for this employee" });
        }
        
        res.status(200).json(records);
    } catch (error) {
        console.log(`Error fetching employee attendance: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const updateAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const attendance = await Attendance.findById(id);
        if (!attendance) {
            return res.status(404).json({ message: "Attendance record not found" });
        }

        attendance.status = status;
        await attendance.save();
        res.status(200).json({ message: "Attendance updated successfully", attendance });
    } catch (error) {
        console.log(`Error updating attendance: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const deleteAttendance = async (req, res) => {
    try {
        const { id } = req.params;

        const attendance = await Attendance.findById(id);
        if (!attendance) {
            return res.status(404).json({ message: "Attendance record not found" });
        }

        await Attendance.findByIdAndDelete(id);
        res.status(200).json({ message: "Attendance record deleted successfully" });
    } catch (error) {
        console.log(`Error deleting attendance: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const filterAttendanceByStatus = async (req, res) => {
    try {
        const { status } = req.query; 

        if (!status) {
            return res.status(400).json({ message: "Please provide a status (Present or Absent)" });
        }

        const records = await Attendance.find({ status }).populate("employeeId", "name email position profile");

        if (records.length === 0) {
            return res.status(404).json({ message: `No attendance records found for status: ${status}` });
        }

        res.status(200).json(records);
    } catch (error) {
        console.log(`Error filtering attendance by status: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = { 
    markAttendance, 
    getAllAttendance, 
    getEmployeeAttendance, 
    updateAttendance, 
    deleteAttendance,
    filterAttendanceByStatus
};