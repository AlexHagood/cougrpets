const Money = require('../models/money')


async function buyMoney(req, res)
{
    let user = req.session.user.username
    const moneyAdd = Number(req.body.amount);
    Money.addBalance(user ,moneyAdd);
    res.redirect("/home");
}


module.exports = {
    buyMoney
};
