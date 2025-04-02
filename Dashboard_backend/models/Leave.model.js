const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee", // Refers to the Employee Model
        required: true,
    },
    designation:{
        type:String,
        enum:["Intern", "Full Time","Developer", "Junior","Senior","Team Lead","Senior Developer"],
        required:true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        // required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
    document: {
        type: String, 
        required: false,
    }
}, { timestamps: true });

const Leave = mongoose.model("Leave", LeaveSchema);
module.exports = Leave;
