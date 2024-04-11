// The user inventory database will simply store a username, and item ID, and a quantity. 
// This represents an item "catalog," that associates those item's with it's relevant info,
// such as name, path, price, hungervalue, happiness value.


const ItemList = []

class Item {
    constructor(name, price, path) {
        this.name = name;
        this.price = price;
        this.path = path;
        this.id = ItemList.length
        ItemList.push(this)
    }
}

class FoodItem extends Item{
    constructor(name, price, path, saturation){
        super(name, price, path);
        this.saturation = saturation
    }
}


function getItemByID(id)
{
    return ItemList[id]
}




new FoodItem("Black Lentil", 5, "/images/blacklentil.png", 3)
new FoodItem("Red Lentil", 10, "/images/redlentil.png", 5)
new FoodItem("Green Lentil", 10, "/images/greenlentil.png", 5)
new FoodItem("Chicken", 10, "/images/chicken.png", 5)

module.exports = {
    ItemList,
    getItemByID
}