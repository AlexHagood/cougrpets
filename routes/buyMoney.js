const express = require('express');
const router = express.Router();
const buyMoney = require('../controllers/buyMoney');



router.post("/", buyMoney.buyMoney);

module.exports = router;