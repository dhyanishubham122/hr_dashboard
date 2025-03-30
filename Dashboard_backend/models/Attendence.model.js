const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["Present", "Absent"],
        default: "Present",
    },
}, { timestamps: true });

const Attendance = mongoose.model("Attendance", AttendanceSchema);
module.exports = Attendance;
