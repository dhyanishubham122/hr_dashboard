const express=require('express');
const router=express.Router();
const { markAttendance, getAllAttendance, getEmployeeAttendance, updateAttendance, 
    deleteAttendance,filterAttendanceByStatus}= require('../controllers/attendenceController.js');
router.get('/filterattendence', filterAttendanceByStatus);
router.post("/markattendence", markAttendance);
router.get("/all", getAllAttendance);
router.get("employeeattendence/:employeeId", getEmployeeAttendance);
router.patch("/update/:id", updateAttendance);
router.delete("/delete/:id", deleteAttendance);

module.exports=router;
    