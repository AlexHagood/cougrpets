const Pet = require('../models/pet');
const Money = require('../models/money')




async function sideBarData (req, res, next){
    username = req.session.user.username;
    
    await Pet.removePetFullness(username)
    await Pet.removePetHappiness(username)
    petHunger = await Pet.getPetFullness(username);
    petHappiness = await Pet.getPetHappiness(username);
    userMoney = await Money.getBalance(username);
    console.log("rendering sidebar stuff")

    
    res.sideBarStats = { 
    happiness : petHappiness,
    hunger : petHunger,
    money : userMoney
    }
    
    console.log(res.sideBarStats)

    next()

}

async function sendSideBar (req, res) {
    console.log("User requested sidebar update.");
    username = req.session.user.username;
    await Pet.removePetFullness(username, 1)
    await Pet.removePetHappiness(username, 1)
    petHunger = await Pet.getPetFullness(username);
    petHappiness = await Pet.getPetHappiness(username);
    userMoney = await Money.getBalance(username);
    console.log("rendering sidebar stuff")

    
    let sideBarStats = { 
    happiness : petHappiness,
    hunger : petHunger,
    money : userMoney
    }
    res.json(sideBarStats)
}

module.exports = {sideBarData, sendSideBar}