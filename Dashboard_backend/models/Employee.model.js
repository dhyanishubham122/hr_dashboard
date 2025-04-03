const mongoose =require('mongoose');
const EmployeeSchema= new mongoose.Schema({
    name: {
        type: String,
        trim:true,
        required: true,
        },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    phone:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    position:{
        type:String,
        enum:["Intern", "Full Time","Developer", "Junior","Senior","Team Lead","Senior Developer"],
        required:true,
    },
    department:{
        type:String,
        enum:["Designer","Backend Development","Frontend Development","Marketing", "Sales", "IT","Not Assigned"],
    },
    Joining_Date:{
        type:Date,
        required:true,
    },
    profile:{
        type:String,
    },
    role: {
        type: String,
        enum: ["Employee", "HR"], 
        default: "Employee"
    },
    status:{
        type:String,
        enum:["Present","Absent"],
        default:"Present",
    },
    lastupdatedDate:{
        type:String,
        default: new Date().toISOString().split("T")[0],
    },

},{
    timestamps:true,
}
)

const Employee= mongoose.model("Employee",EmployeeSchema);
module.exports=Employee;