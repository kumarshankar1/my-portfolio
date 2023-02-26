const mongoose = require('mongoose');

const connection = async()=>{
    mongoose.connect(process.env.MONGOURL)
    .then(()=>{
        console.log('Server Connected to Mongo DB')
    })
    .catch((err)=>{
        console.log(err)
    })
}

connection();
