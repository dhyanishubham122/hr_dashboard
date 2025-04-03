const cron =require('node-cron');
const Employess=require('./models/Employee.model');
const resetEmployeeStatus = async () => {
    try {
        const today = new Date().toISOString().split("T")[0]; // Get today's date

        await Employess.updateMany(
            { lastUpdatedDate: { $ne: today } }, // Only update if not already updated today
            { $set: { status: "Present", lastUpdatedDate: today } }
        );
        console.log("Employee statuses reset at midnight.");
    } catch (error) {
        console.error("Error resetting employee statuses:", error);
    }
};

// Schedule cron job at 00:00 (midnight) daily
cron.schedule('0 0 * * *', resetEmployeeStatus);
module.exports = resetEmployeeStatus;

// corn.schedule('0 0 * * *',async()=>{
//     console.log('running every day at 12:00 AM');
//     try{
//         const today = new Date().toISOString().split("T")[0]; // Get today's date
//         await Employee.updateMany(
//             { lastUpdatedDate: { $ne: today } }, // Only update if not already updated today
//             { $set: { status: "Present", lastUpdatedDate: today } }
//         );
//         console.log("Employee statuses reset at midnight.");
//     }
//     catch(error){
//         console.error("Error resetting employee statuses:", error);
//     }
// })