const express = require('express');
const router = express.Router();
const { createUser,loginUser } = require("../Controllers/User.js");

router.route("/create").post(createUser);
router.route("/login").post(loginUser);

module.exports = router