"use strict";
const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user.controller");
router.post("/login", userCtrl.login);
router.post("/register", userCtrl.register);
module.exports = router;
