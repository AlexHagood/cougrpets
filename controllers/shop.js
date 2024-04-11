const Item = require('../models/items');
const Money = require('../models/money')
const Inventory = require('../models/inventory')

async function getShop(req, res){
    res.render('base', {content : "./shop", inventory : Item.ItemList})
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
