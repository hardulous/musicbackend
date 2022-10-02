const mongoose = require('mongoose');
const UploadAudio = new mongoose.Schema({
    
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

module.exports = mongoose.model("UploadAudio",UploadAudio);