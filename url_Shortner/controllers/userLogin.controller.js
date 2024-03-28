const User = require('../models/user.models.js');
const { v4: uuidv4 } = require('uuid');
const {setUser , getUser} = require('../services/Auth.js');

async function handleUserLogin(req , res) {
    const {email , password} = req.body;
    
    const User1 = await User.findOne({email , password});
    
    if(!User1) 
        return res.render("login" , {err : "invalid email id or password"});
    
    console.log("handleUserLogin : " , User1);   
    // const new_user = {email : ser.emaiul , name : user.name}; 
    const token = setUser({email : User1.email , name : User1.name , _id : User1._id , role : User1.role});
    console.log("token" , token);

    req.user = User1;

    console.log("req.user :-> " , req.user);

    res.cookie("token" , token);
    res.redirect("/");
    // return res.json({token});
}

module.exports = {
    handleUserLogin
};