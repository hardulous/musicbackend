const express = require('express');
const router = express.Router();
const { createUser,loginUser,fetchUser,getUser } = require("../Controllers/User.js");

router.route("/create").post(createUser);
router.route("/login").post(loginUser);
router.route("/auth").post(fetchUser,getUser)

module.exports = router