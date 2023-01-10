import mongoose from "mongoose";

const  UserSchema = new mongoose.Schema({
   
    email:{
        type:String,
        required:true,
        unique:true
    },
   
    username:{
        type:String,
        required:true,
        unique:true
    },
  
   password:{
        type:String,
        required:true,
        unique:true,
    
    },
    profilePic:{
        type:String,
        default:"",
    },
    
  
},{timestamps:true});

  const s = mongoose.model("User",UserSchema);

// module.exports= mongoose.model("User",UserSchema);
export default s;