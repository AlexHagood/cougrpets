const Profile = require('../models/authenticate')

async function changePass (req, res, next) {
    await Profile.changePassword(req.session.user.username, req.body.newpassword)
    res.send("password changed")
}


module.exports = 
{
    changePass
}