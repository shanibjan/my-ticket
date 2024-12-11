import mongoose from "mongoose";


const connectDB = async()=>{
   
    console.log(process.env.MONGO_URL);
    
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log(`connected to MongoDB Database ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in MongoDB ${error}`.bgRed);
  }
}

export default connectDB;