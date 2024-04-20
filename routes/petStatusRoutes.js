const express = require('express');
const router = express.Router();
const petStatusController = require('../controllers/petStatus');




router.get("/", petStatusController.sideBarData);

router.get("/sideBarData", petStatusController.sendSideBar);


module.exports = router;