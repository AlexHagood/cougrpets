let itemIdCounter = 1;

function addShopItem(name, imagePath, price) {
    let itemHTML = `
    <div class="Item" id="${"si#" + itemIdCounter}">
                <div class="itemTitle">
                    ${name}
                </div>
                ${price}
                <img class="itemIcon" src="${imagePath}">
                <form class="itemMenu" id="${"sf#" + itemIdCounter}">
                    <select>
                        <option value="0">Buy</option>
                        <option value="1">Haggle</option>
                    </select>
                    <button type="button" onclick="popShopItem(${itemIdCounter})">></button>
                </form>
            </div>
    `
    
    let shopGrid = document.getElementById('shop-grid');
    if (shopGrid) {
        shopGrid.innerHTML += itemHTML;
    }
    console.log("Added item with id num " + itemIdCounter)
    itemIdCounter++;
}

function itemGo(){

    console.log("button clicked");
}


function popShopItem(idNumber) 
{
    let idString = "si#" + idNumber
    console.log("Deleting item " + idString)
    let deleteMe = document.getElementById(idString);
    if (deleteMe) {
        deleteMe.remove();
    } else {
        console.warn("Element not found for ID: " + idString);
    }


}

let restock = document.getElementById('restock');

restock.addEventListener("click", () => {
    console.log("Restock!");
    addShopItem("Black Lentil", "images/blacklentil.png", "3 cents")
    addShopItem("Chicken", "images/chicken.png", "10 dollars")
    addShopItem("Green Lentil", "images/greenlentil.png", "5 cents")
});

addShopItem("Black Lentil", "images/blacklentil.png", "3 cents")
addShopItem("Chicken", "images/chicken.png", "10 dollars")
addShopItem("Green Lentil", "images/greenlentil.png", "5 cents")
addShopItem("Black Lentil", "images/blacklentil.png", "3 cents")
addShopItem("Chicken", "images/chicken.png", "10 dollars")
addShopItem("Green Lentil", "images/greenlentil.png", "5 cents")

addShopItem("Black Lentil", "images/blacklentil.png", "3 cents")
addShopItem("Chicken", "images/chicken.png", "10 dollars")
addShopItem("Green Lentil", "images/greenlentil.png", "5 cents")


