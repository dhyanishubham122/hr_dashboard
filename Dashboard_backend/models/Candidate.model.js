const mongoose=require('mongoose');
const CandidateSchema= new mongoose.Schema({
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
        enum:["Designer Intern", "Developer", "Senior Developer", "Human Resource Intern"],
        required:true,
    },
    experience:{
        type:Number,
        required:true,
    },
    resume:{
        type:String,
        required:true,
        },
    status:{
        type:String,
        enum:["New","Scheduled","Ongoing","Selected","Rejected"],
        default: "New",
    }, 
 },
 {timestamps:true}
);

const Candidate= mongoose.model("Candidate",CandidateSchema);
module.exports=Candidate;