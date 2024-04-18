const Pet = require('../models/pet');




async function getHappiness(req, res) {
    Pet.getPetHappiness("Tempuser")
}



async function getHunger(req, res) {
    Pet.getPetFullness("Tempuser")
}

module.exports = {getHappiness, getHunger}