const mongoose=require('mongoose');

const connectDb=async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/Hr_DB');
            console.log('Connected to MongoDB');

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}
module.exports=connectDb;