const express = require('express');
const URL = require('../models/urls.models.js');
const router = express.Router();
const {restricTo} = require("../middlewares/Auth.js");

router.get("/" , async (req , res) => {
    console.log("req --> " , req.user);
    const Urls = await URL.find({createdBy : req.user?._id});
    if(Urls.length === 0) {
        console.log(" --- ");
       console.log(" Urls  : " , Urls);
       res.render("login");
    }
    console.log("Urls : ", Urls);
    res.render("home" , {URLS : Urls});
})

router.get("/admin" , restricTo(["ADMIN"]) , async(req , res) => {
      const Urls = await URL.find({});

      console.log("Admin wala Urls --> " , Urls);

      res.render("home" , {
            URLS : Urls,
      }) 
});

router.get("/signup" , async(req , res) => {
    return res.render("signup");
})

router.get("/login" , async(req , res) => {
    return res.render("login");
})

module.exports = router;