const Pet = require('../models/pet');
const Money = require('../models/money')




async function sideBarData (req, res, next){
    petHunger = await Pet.getPetFullness("Tempuser")
    petHappiness = await Pet.getPetHappiness("Tempuser")
    userMoney = await Money.getBalance("Tempuser")
    console.log("rendering sidebar stuff")

    
    res.sideBarStats = { 
    happiness : petHappiness,
    hunger : petHunger,
    money : userMoney
    }
    
    console.log(res.sideBarStats)

    next()

}

async function sendSideBar (req, res, next) {
    console.log("User requested sidebar update.");
    petHunger = await Pet.getPetFullness("Tempuser")
    petHappiness = await Pet.getPetHappiness("Tempuser")
    userMoney = await Money.getBalance("Tempuser")
    console.log("rendering sidebar stuff")

    
    let sideBarStats = { 
    happiness : petHappiness,
    hunger : petHunger,
    money : userMoney
    }
    res.json(sideBarStats)
}

module.exports = {sideBarData, sendSideBar}