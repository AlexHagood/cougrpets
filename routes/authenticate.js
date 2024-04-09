const express = require('express');
const router = express.Router();
const authController = require('../controllers/authenticate.js');




router.get("/login", (req, res) => {
    res.sendFile(path.resolve("views/login.html"))
});

router.get("/register", (req, res) => {
    res.sendFile(path.resolve("views/registration.html"))
});


router.post("/login", authController.login)

router.post("/register", authController.register)


module.exports = router;