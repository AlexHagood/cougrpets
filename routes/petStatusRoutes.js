const express = require('express');
const router = express.Router();
const petStatusController = require('../controllers/petStatus');




router.get("/", petStatusController.getHappiness, petStatusController.getHunger);

module.exports = router;