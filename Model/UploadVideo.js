const mongoose = require('mongoose');
const uploadVideo = new mongoose.Schema({
    
    uploadBy:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User',     
        required:true,
    },

    media:{
        data:Buffer,
        contentType:String,
    },
    
})

module.exports = mongoose.model("UploadVideo",uploadVideo);