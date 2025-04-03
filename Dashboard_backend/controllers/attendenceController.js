const Attendance=require('../models/Attendence.model.js');
const Employee=require('../models/Employee.model.js');
const uploadoncloudinary=require("../config/cloudinary.js");
const mongoose=require('mongoose');
const moment = require("moment");

const { findByIdAndUpdate } = require('../models/Candidate.model.js');
const markAttendance = async (req, res) => {
    try {
        const { employeeId, status } = req.body;

        // Validate employee
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const today = moment().startOf("day").toDate(); // Ensure consistent date format

        // Check if attendance already exists
        const existingRecord = await Attendance.findOne({ employeeId, date: today });

        if (existingRecord) {
            // Instead of returning an error, update the existing record
            await Attendance.updateOne(
                { employeeId, date: today },
                { $set: { status: status || "Present" } }
            );
            await Employee.findByIdAndUpdate(employeeId, { $set: { status: status || "Present" } });

            return res.status(200).json({ message: "Attendance updated successfully" });
        }

        // If no record exists, create a new one
        const attendance = new Attendance({
            employeeId,
            status: status || "Present",
            date: today,
        });

        await attendance.save();
        res.status(201).json({ message: "Attendance marked successfully", attendance });

    } catch (error) {
        console.error(`Error in marking attendance: ${error.message}`);
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
const editAttendance = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { status } = req.body;
        const objectIdEmployeeId = new mongoose.Types.ObjectId(employeeId);
        const now = new Date();
        const startOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
        const endOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999));
        const attendance = await Attendance.findOne({
            employeeId: objectIdEmployeeId,
            date: { $gte: startOfDay, $lt: endOfDay }
        });
        if (!attendance) {
            return res.status(404).json({ message: "Attendance record not found" });
        }
        attendance.status = status;
        await attendance.save();
        await Employee.findByIdAndUpdate(objectIdEmployeeId, { $set: { status: status || "Present" } });
        res.status(200).json({ message: "Attendance record updated successfully" });

    } catch (error) {
        console.log(`Error in editing attendance: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error in editing attendance" });
    }
};


const todayAttandence = async (req, res) => {
    try {
        const today = moment().startOf("day").toDate(); // Get today's date without time
        const employees = await Employee.find(); // Fetch all employees

        let newEntries = [];

        for (const emp of employees) {
            const existingAttendance = await Attendance.findOne({ employeeId: emp._id, date: today });

            if (!existingAttendance) {
                // Insert attendance only if it doesn't exist for the employee
                await Attendance.updateOne(
                    { employeeId: emp._id, date: today }, // Find condition
                    { $set: { status: "Present" } }, // Update data
                    { upsert: true } // Insert if not exists
                );

                newEntries.push(emp._id);
            }
        }

        const updatedAttendanceRecords = await Attendance.find({ date: today });

        res.status(200).json({
            message: newEntries.length > 0
                ? "Attendance updated with new employees"
                : "All employees' attendance already marked",
            records: updatedAttendanceRecords
        });

    } catch (error) {
        res.status(500).json({ message: "Error marking attendance", error });
    }
};

module.exports = { 
    markAttendance, 
    getAllAttendance, 
    getEmployeeAttendance, 
    updateAttendance, 
    deleteAttendance,
    filterAttendanceByStatus,
    editAttendance,
    todayAttandence
};