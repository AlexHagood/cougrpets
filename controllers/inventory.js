const Item = require('../models/items');
const Inventory = require('../models/inventory');
const Pet = require('../models/pet');




async function getInventory(req, res){
    Inventory.getInventory()
    .then(packedInv => {
        res.render('base', {
        content : "./inventory", 
        inventory : Inventory.unpackInventory(packedInv)
    })})
}


async function eatItem(req, res){
    const itemID = req.body.itemID;
    const saturation = Item.getItemByID(itemID).saturation

    Inventory.popItem("TempUser", itemID)
    Pet.addPetFullness("Tempuser", saturation)
    res.send("Yum!")

}

module.exports = {getInventory, eatItem}