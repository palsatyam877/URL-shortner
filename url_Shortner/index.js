const express = require('express');
const urlRouter = require('./routes/url.routes.js');
const app = express();
const PORT = 8001;
const {connectToMongoDB} = require('./connect.js');
const URL = require('./models/urls.models.js');
const path = require('path');
const staticRoute = require('./routes/staticRouter.js');
const userRoute = require('./routes/user.routes.js');
const cookieParser = require('cookie-parser');
const {restricTo , checkForAuthentication} = require('./middlewares/Auth.js');

connectToMongoDB("mongodb://127.0.0.1:27017/mydbbe")
.then(() => { console.log("MongoDB connected..") })

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.set("view engine" , "ejs");
app.set("views" , path.resolve('./views'));

app.use("/" , staticRoute);
app.use("/user" , userRoute);

app.use("/test" , async (req , res) => {
    const allUrls = await URL.find({});
    return res.render('home' , {
        urls : allUrls
    });
})

app.use('/url', restricTo(["NORMAL" , "ADMIN"]) ,  urlRouter);

app.use('/url/:shortiD' , async (req , res) => {
    const shortID = req.params.shortiD;
    try {
        const originalInput = await URL.findOneAndUpdate(
            {
                shortId : shortID
            } ,
            {
                $push : {
                    visitHistory : {timestamp : Date.now()},
                }
            } , 
            {
                new : true,
            }
        )

        console.log( "originailInput : " , originalInput);

        return res.redirect(originalInput.redirectURL);
    } catch(error) {
        return res.status(400).json({err : 'shortId invalid'});
    }
});

app.listen(PORT , () => console.log(`App is listening in port ${PORT}`));