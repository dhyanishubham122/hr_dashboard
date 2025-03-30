const express=require('express');
const app=express();
const dotenv=require('dotenv');
const cors=require('cors');
const connectDb=require('./config/db.js');
const userRoutes=require('./routes/userroutes.js');
const candidateRoutes=require('./routes/candidateroutes.js');
const employeeRoutes=require('./routes/employeeroutes.js');
const attendanceRoutes=require('./routes/attendenceroutes.js');
const leaveRoutes=require('./routes/leaveroutes.js');
dotenv.config();
const port=process.env.PORT || 3000;
app.use(express.json());
connectDb();
app.use(cors({ origin: '*' }));

app.get('/',(req,res)=>{
    res.send(`Backend is Running on port ${port}`);
})
app.use('/user',userRoutes);
app.use('/candidate',candidateRoutes);
app.use('/employee',employeeRoutes);
app.use('/attendence',attendanceRoutes);
app.use('/leave',leaveRoutes);
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});