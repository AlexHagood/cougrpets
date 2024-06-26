const Item = require('../models/items');
const Inventory = require('../models/inventory');
const Pet = require('../models/pet');
const ejs = require("ejs");




async function getInventory(req, res, next){
    
    username = req.session.user.username

    inventory = await Inventory.unpackInventory(username)

    
    res.contentHTML = 
    ejs.renderFile(__dirname + '/../views/inventory.ejs', { 
    inventory : inventory
    })


    next()

}


async function eatItem(req, res){
    const itemID = req.body.itemID;
    const saturation = Item.getItemByID(itemID).saturation
    const username = req.session.user.username
    console.log("ITEM ID: !!", itemID, "Saturation:", saturation);
    if (itemID == 3) {Pet.removePetHappiness(username, 20)} else {Pet.addPetHappiness(username, 10)}
    Inventory.popItem(username, itemID)
    Pet.addPetFullness(username, saturation)
    res.send("Yum!")

}

module.exports = {getInventory, eatItem}