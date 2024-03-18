import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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

  joining_date: {
    type: String,
    require: true,
  },

  role: {
    type: String,
    require: true,
  },

  status: {
    type: String,
    require: true,
  },


});



export default mongoose.model("User", userSchema);
