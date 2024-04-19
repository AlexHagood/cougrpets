const Item = require('../models/items');
const Inventory = require('../models/inventory');
const Pet = require('../models/pet');
const ejs = require("ejs");




async function getInventory(req, res, next){
    
    username = req.session.user.username
    packedInv = await Inventory.getInventory(username)
    
    res.contentHTML = 
    ejs.renderFile(__dirname + '/../views/inventory.ejs', { 
    inventory : Inventory.unpackInventory(packedInv)
    })


    next()

}


async function eatItem(req, res){
    const itemID = req.body.itemID;
    const saturation = Item.getItemByID(itemID).saturation

    Inventory.popItem("TempUser", itemID)
    Pet.addPetFullness("Tempuser", saturation)
    res.send("Yum!")

}

module.exports = {getInventory, eatItem}