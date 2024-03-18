import mongoose from "mongoose";

const registerSchema = mongoose.Schema({
    fname: {
        type: String,
        require: true,
      },
    
      lname: {
        type: String,
        require: true,
      },
    
      gender: {
        type: String,
        require: true,
      },
    
      
    
      role: {
        type: String,
        require: true,
      },
    
      email: {
        type: String,
        require: true,
      },
    
      password: {
        type: String,
        require: true,
      },
});

export default mongoose.model("People",registerSchema);