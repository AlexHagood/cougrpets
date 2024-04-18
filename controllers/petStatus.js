const Pet = require('../models/pet');
const Money = require('../models/money')




async function sideBarData (req, res, next){
    petHunger = await Pet.getPetFullness("Tempuser")
    petHappiness = await Pet.getPetHappiness("Tempuser")
    userMoney = await Money.getBalance("Tempuser")
    console.log("rendering sidebar stuff")
    console.log("money: ", userMoney)

    
    res.sideBarStats = { 
    happiness : petHappiness,
    hunger : petHunger,
    money : userMoney
    }
    
    console.log(res.sideBarStats)

    next()

}

module.exports = {sideBarData}