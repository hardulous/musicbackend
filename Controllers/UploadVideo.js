const UploadVideo = require("../Model/UploadVideo.js");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

const videoById = async (req,res,next,id)=>{


    try {
        
      const uploadVideo = await UploadVideo.findById(id);
       
      if(!uploadVideo){
        return res.status(400).json({
          error:"Product not found"
        })
      }
  
      req.uploadVideo = uploadVideo;
      next();
  
    } catch (error) {
      return res.status(400).json(error.message)
    }
  
}

const createVideo = async (req, res) => {

  try {
    let form = new formidable.IncomingForm();
    console.log(form);
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      console.log(fields);
      console.log(files);

      if (err) {
        return res.status(400).json({
          error: "Video could not be uploaded",
        });
      }

      const { uploadBy } = fields;

      if (!uploadBy) {
        return res.status(400).json({
          error: "All fields are required",
        });
      }

      let newUpload = new UploadVideo(fields);

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
    return res.status(400).json(error.message);
  }
};

const getVideos = async (req, res) => {
  try {
    console.log(req.params)
    const {id} = req.params
    console.log("Hello")
    const Videos = await UploadVideo.find({uploadBy:id}).select("-media");
    if(!Videos){
      return res.status(200).json({message:"No Video found"})
    }
    else{
      return res.status(200).json(Videos)
    }

   } catch (error) {
     return res.status(400).json({message:error.message})
   }
};

const getVideo = async (req,res) => {
  try {
    if (req.uploadVideo.media.data) {
      res.set("Content-Type", req.uploadVideo.media.contentType); 
      return res.status(200).send(req.uploadVideo.media.data); 
    }
  } catch (error) {
    return res.status(400).json({success:false,message:error.message});
  }
};


module.exports = {
    videoById,
    createVideo,
    getVideos,
    getVideo
}