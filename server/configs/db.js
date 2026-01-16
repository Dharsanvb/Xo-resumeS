import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", ()=> {
            console.log("Database connected successfully"); })

            let mongodbURI = process.env.MONGODB_URL;
            const projectName = 'Resume_Builder_Xo';

            if(!mongodbURI){
                throw new Error("MONGODB_URL environment variable not set")
            }
            
            if(mongodbURI.endsWith('/')){
                mongodbURI = mongodbURI.slice(0, -1)
            }

            await mongoose.connect(`${mongodbURI}/${projectName}`);
       
    } catch (error) {
        console.error("Error connecting to MongoDb:", error)
    }
}

export default connectDB;