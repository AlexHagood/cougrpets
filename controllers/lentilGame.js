const Money = require('../models/money')
const Pet = require('../models/pet')



async function lentilWin(req, res)
{
    let user = req.session.user.username
    let reward = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
    const moneyAdd = reward;
    Money.addBalance(user ,moneyAdd);
    Pet.addPetHappiness(user, 50);
    res.send(`Thanks for counting my lentils! You win $${reward}!`);
}


module.exports = {lentilWin};