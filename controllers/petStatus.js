const Pet = require('../models/pet');




async function sideBarData (req, res, next){
    petHunger = await Pet.getPetFullness()
    petHappiness = await Pet.getPetHappiness()
    console.log("rendering sidebar stuff")
    console.log("pet happiness: ", petHappiness)
    
    res.sideBarStats = { 
    happiness : petHappiness,
    hunger : petHunger
    }
    
    console.log(res.sideBarStats)

    next()

}

module.exports = {sideBarData}