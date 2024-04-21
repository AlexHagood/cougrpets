const express = require('express');
const router = express.Router();
const petStatusController = require('../controllers/petStatus');



router.get("/updateSidebar", petStatusController.sendSideBar);

router.get("/", petStatusController.sideBarData);



module.exports = router;