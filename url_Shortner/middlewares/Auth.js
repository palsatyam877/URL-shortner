const {getUser} = require("../services/Auth.js");


function checkForAuthentication(req , res , next) {
    const authorizationHeaderValue = req.cookies?.token;

    console.log("authorizationHeaderValue -> " , authorizationHeaderValue);

    if(!authorizationHeaderValue) return next();

    const token = authorizationHeaderValue;

    const user = getUser(token);
    req.user = user;

    return next();
}

function restricTo(roles = []) {
    return function(req , res , next) {
        // console.log("Hiii.. ");
        if(!req.user.role) return res.redirect("./login");

        

        if(!roles.includes(req.user.role)) {
             console.log(" --------- " , req.user.role);
             console.log(" --------- " , req.user.email);
             return res.end("Unauthorized");
        }  
        // console.log("HIIIII ....");
        return next();
    }; 
}

module.exports = {
    checkForAuthentication,
    restricTo
}