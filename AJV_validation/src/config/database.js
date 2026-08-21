import mongoose from "mongoose";
import config from "./config.js";



const connectToDB = async () =>{
     try{
        await mongoose.connect(config.mongoUri);
        console.log('db connected');
        
     }
     catch(err){
        console.log('DB connection error ' , err)
     }
}


export default connectToDB;