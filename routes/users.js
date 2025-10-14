const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/PinterestDB");

const userSChema=mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullname: {
      type: String,  
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6, // You can adjust security requirement
    },
    dp: {
      type: String, // URL or path to profile picture
      default: "",  // optional
    },
    boards:[],
    
});


module.exports=mongoose.model("user",userSChema)