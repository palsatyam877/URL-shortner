const User = require('../models/user.models.js');

async function handleUserSignup(req , res) {
    const {email , password , name} = req.body;
    const Us = await User.find({});
    console.log("Users : " ,  Us);
    
    await User.create({
        email,
        password,
        name
    });

    return res.render("home");
}

module.exports = {
    handleUserSignup
};