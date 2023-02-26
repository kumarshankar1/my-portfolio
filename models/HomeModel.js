const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var HomeInfochema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
   
    description:{
        type:String,
        required:true,
    },
    status:{
      type:String,
      default:1,
    },
},{timestamps:true});


//Export the model
module.exports = mongoose.model('HomeInfo', HomeInfochema);