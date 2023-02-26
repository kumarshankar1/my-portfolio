const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var AdminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
   
    password:{
        type:String,
        required:true,
    },
    status:{
      type:String,
      default:1,
    },
    isBlocked:{
        type:Boolean,
        default:false,
    },
    role:{
        type:String,
        default:"admin",
    },
    
},{timestamps:true});


//Export the model
module.exports = mongoose.model('Admin', AdminSchema);