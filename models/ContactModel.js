const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var ContactSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
   
    phone:{
        type:String,
        required:true,
    },
    message:{
      type:String,
      required:true,
  },
    status:{
      type:String,
      default:1,
    },
},{timestamps:true});


//Export the model
module.exports = mongoose.model('Contact', ContactSchema);