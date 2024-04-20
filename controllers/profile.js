const Profile = require('../models/authenticate')

async function changePass (req, res, next) {
    Profile.changePassword(req.session.user.username, req.body.newpassword)
    res.send("it works?")
}

async function changeUser (req, res, next) {
    Profile.changePassword(req.session.user.username, req.body.newuser)
    res.send("it works?")
}

module.exports = 
{
    changePass,
    changeUser
}