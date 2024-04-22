var express = require('express');
var router = express.Router();
const Profile = require('../controllers/profile');
const ejs = require("ejs");

router.get('/', (req, res, next) => {
    console.log("profile router");
    username = req.session.user.username
    console.log("Acessing profile page with user", username);
    res.contentHTML = ejs.renderFile(__dirname + "/../views/profile.ejs", {username : username})
    next();
})

router.get("/password", (req, res) => {
    res.redirect("/profile")
})


router.post('/password', Profile.changePass)

module.exports = router