import mongoose from "mongoose"
import '@dotenvx/dotenvx/config'

const MONGODB_URL = process.env.MONGODB_URL 

const dbConnectionInstance = async () => {
    try {
        const db = await mongoose.connect(MONGODB_URL)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("error : ",error);
    }
    
}
export default dbConnectionInstance