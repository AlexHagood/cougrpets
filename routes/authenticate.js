const express = require('express');
const router = express.Router();
const authController = require('../controllers/authenticate.js');




router.get("/login", (req, res) => {
    res.sendFile(path.resolve("views/login.html"))
});

router.get("/register", (req, res) => {
    res.sendFile(path.resolve("views/registration.html"))
});


router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login")
    })
});


router.post("/login", authController.login)

router.post("/register", authController.register)


module.exports = router;