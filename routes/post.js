const mongoose = require('mongoose');


const postSChema=mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"user"
    },
    image: String,
    title:String,  
    description:String,
});


module.exports=mongoose.model("post",postSChema)