const mongoose = require('mongoose');

const upload = new mongoose.Schema({
    
    uploadBy:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User',     
        required:true,
    },

    uploaded:{
        data:Buffer,
        contentType:String,
    },
    
    
})

module.exports = mongoose.model("Upload",upload);