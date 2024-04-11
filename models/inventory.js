const { getItemByID } = require("./items")

tempInventory = {1:1, 2:3}


async function getInventory(username)
{
    //Returns a object, {itemID: Quantity}
    return tempInventory
}

// converts {ID: Quantity, ...} form to a array of all items.
function unpackInventory(packed)
{
    unpacked = []
    for (let key in packed)
    {
        for (let i = 0; i < packed[key]; i++)
        {
            unpacked.push(getItemByID(key))
        }
    }
    return unpacked;
}

async function addItem(username, itemId)
{

    // THIS IS ALL TEMPORARY
    if (itemId in tempInventory)
    {
        tempInventory[itemId] += 1
    } else {
        tempInventory[itemId] = 1
    }

    // This function should add an item to the user inventory DB!!
}

async function popItem(username, itemId)
{
    // TEMPORARY
    if (String(itemId) in tempInventory)
    {
        tempInventory[itemId] -= 1
    } else {
        console.log("How did you do that!?")
    }



    // Subtract 1 from the respective itemID's quantity!
}

module.exports = {getInventory, unpackInventory, addItem, popItem}

