const Item = require('../models/items');
const Money = require('../models/money')
const Inventory = require('../models/inventory')
const ejs = require('ejs')

async function getShop(req, res, next)
{
    res.contentHTML = ejs.renderFile(__dirname + "/../views/shop.ejs", {inventory : Item.ItemList})
    next()
}

async function purchase(req, res){
    const itemID = req.body.itemID;
    const price = Item.getItemByID(itemID).price

    Money.getBalance("tempUser")
    .then(Balance => {
        console.log("userbal:", Balance, price)
    if (Balance > price) {
        Money.subtractBalance("tempUser", price)
        Inventory.addItem("tempUser", itemID)
        res.send("Thank you for your purchase!")
    } else { // insufficient funds
        res.send("Get out of my shop brokie!")
    }
})}

module.exports = 
{
    getShop,
    purchase
}
