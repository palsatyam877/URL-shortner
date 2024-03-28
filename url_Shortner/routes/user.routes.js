const express = require('express');
const router = express.Router();
const {handleUserSignup} = require("../controllers/userSignup.controllers.js");
const {handleUserLogin} = require("../controllers/userLogin.controller.js");

router.post("/" , handleUserSignup);
router.post("/login" ,handleUserLogin);

module.exports = router;