const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');




router.get("/", shopController.getShop);

router.post("/", shopController.purchase)

module.exports = router;