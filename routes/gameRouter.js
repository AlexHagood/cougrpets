const express = require('express');
const router = express.Router();
const lentilController = require('../controllers/lentilGame.js');
const ejs = require("ejs");



router.post("/lentilcounter", lentilController.lentilWin);

router.get("/lentilcounter", (req, res, next) => {
    console.log("In lentil counter get router")
    res.contentHTML = ejs.renderFile(__dirname + "/../views/lentilcount.ejs");
})

router.get("/", (req, res) => {
    if (req.originalUrl === "/games"){
    res.redirect("/gameselect");
    }
})

module.exports = router;