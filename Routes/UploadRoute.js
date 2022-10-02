const express = require('express');
const { createAudio,getAudio, audioById,getAudios } = require('../Controllers/UploadAudio');
const { videoById,createVideo,getVideos,getVideo } = require('../Controllers/UploadVideo.js')
const { fetchUser } = require("../Controllers/User.js");
const router = express.Router();

// AUDIOS
router.param("audioId",audioById);

router.route("/audio").post(createAudio)
router.route("/getaudio/:audioId").get(getAudio)
router.route("/getaudios/:id").get(getAudios);

// VIDEOS
router.param("videoId",videoById)
router.route("/video").post(createVideo)
router.route("/getvideo/:videoId").get(getVideo)
router.route("/getvideos/:id").get(getVideos);


module.exports = router