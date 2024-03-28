const shortid = require('shortid');
const URL = require('../models/urls.models.js');

async function handleGenerateShortId(req, res) {
   const body = req.body;
   if (!body.url) return res.status(400).json({ error: "url is required" });
   const shortID = shortid.generate();
   console.log(shortID);
    console.log("Short Id");
    console.log("_id : " ,  req.user._id);
    try {
      await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy : req.user._id
      });
    } catch (error) {
        console.log("err : " , error);
        return res.status(400).json({bad : "req"});
    }
 
   return res.render("home" , { id: shortID });
 }

async function handleAnalytics(req , res) {
      const shortID = req.params.shortid;
      try {
        const analytics = await URL.findOne({shortId : shortID});
        return res.status(200).json( { analytic : analytics } );
      } catch (error) {
        return res.status(400).json( { error : 'invalid short Id' } );
      }
} 

module.exports = {
  handleGenerateShortId,
  handleAnalytics
};