const express=require('express');
const router=express.Router();
const { markAttendance, getAllAttendance, getEmployeeAttendance, updateAttendance, 
    deleteAttendance,filterAttendanceByStatus,editAttendance,todayAttandence}= require('../controllers/attendenceController.js');
router.get('/filterattendence', filterAttendanceByStatus);
router.post("/markattendence", markAttendance);
router.get("/all", getAllAttendance);
router.get("employeeattendence/:employeeId", getEmployeeAttendance);
router.patch("/update/:id", updateAttendance);
router.delete("/delete/:id", deleteAttendance);
// router.patch("edit/:employeeId",editAttendance);
router.patch("/edit/:employeeId", (req, res, next) => {
    console.log("PATCH request received at /attendence/edit/:employeeId");
    console.log("Employee ID:", req.params.employeeId);
    next();
}, editAttendance);
router.post("/todayattendance",todayAttandence);
module.exports=router;
    