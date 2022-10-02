const UploadAudio = require("../Model/UploadAudio.js");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

const createAudio = async (req, res) => {

  try {
    let form = new formidable.IncomingForm();
    console.log(form);
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      console.log(fields);
      console.log(files);

      if (err) {
        return res.status(400).json({
          error: "Audio could not be uploaded",
        });
      }

      const { uploadBy } = fields;

      if (!uploadBy) {
        return res.status(400).json({
          error: "All fields are required",
        });
      }

      let newUpload = new UploadAudio(fields);

      if (files.media) {
        if (files.media.size > 3048576) {
          return res.status(404).json({
            error: "Audio should be less than 3 mb in size",
          });
        }
        
        console.log(files.media.mimetype)
        newUpload.media.data = fs.readFileSync(files.media.filepath);
        newUpload.media.contentType = files.media.mimetype;
      }

      newUpload.save((error, upload) => {
        if (error) {
          return res
            .status(400)
            .json({ success: false, message: error.message });
        }

        return res.status(201).json({ success: true, upload });
      });
    });
  } catch (error) {
    return res.status(400).json({
      error: errorHandler({ err: error, errmsg: error.message }),
    });
  }
};

const getAudios = async (req, res) => {
  try {
    console.log(req.params)
    const {id} = req.params
    console.log("Hello")
    const Audios = await UploadAudio.find({uploadBy:id}).select("-media");
    if(!Audios){
      return res.status(200).json({message:"No audio found"})
    }
    else{
      return res.status(200).json(Audios)
    }

   } catch (error) {
     return res.status(400).json({message:error.message})
   }
};

const getAudio = async (req,res) => {
  try {
    if (req.uploadAudio.media.data) {
      res.set("Content-Type", req.uploadAudio.media.contentType); 
      return res.status(200).send(req.uploadAudio.media.data); 
    }
  } catch (error) {
    return res.status(400).json({success:false,message:error.message});
  }
};

const audioById = async (req,res,next,id)=>{

  try {
      
    const uploadAudio = await UploadAudio.findById(id);
     
    if(!uploadAudio){
      return res.status(400).json({
        error:"Product not found"
      })
    }

    req.uploadAudio = uploadAudio;
    next();

  } catch (error) {
    return res.status(400).json(error.message)
  }

}


module.exports = {
  createAudio,
  getAudio,
  audioById,
  getAudios,
};
