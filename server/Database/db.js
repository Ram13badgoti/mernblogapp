import mongoose from "mongoose";



 const connection = async (MONGO_URL)=>{
   
    try {
        await mongoose.connect(MONGO_URL,{
          
            useNewUrlParser: true,
            useUnifiedTopology: true,
          
          });
        console.log("database connected succefull")
    } catch (error) {
        console.log("Error while connecting with the databse",error);
    }
}



export default connection;




