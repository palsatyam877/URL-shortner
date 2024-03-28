const express = require('express');
const router = express.Router();
const {handleGenerateShortId , handleAnalytics} = require('../controllers/shortId.controllers.js');
const {restricTo , checkForAuthentication} = require('../middlewares/Auth.js')
console.log(typeof handleGenerateShortId);
router.get('/analytics/:shortid' , handleAnalytics);
router.post('/',  handleGenerateShortId);

module.exports = router;