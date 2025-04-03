const express = require("express");
const upload=require('../utils/multer.js');
const { createLeave, getAllLeaves,  updateLeaveStatus,
    getApprovedLeaves,leavefilter } = require("../controllers/leavecontroller.js");

const router = express.Router();

router.post("/create", upload.single("document"), createLeave); 
router.get("/getallleaves", getAllLeaves); 
// router.get("getleave/:id", getLeaveById); 
router.patch("/leavestatus/:id", updateLeaveStatus); 
router.get("/approved", getApprovedLeaves); 
router.get("/leavefilter",leavefilter);
module.exports = router;
