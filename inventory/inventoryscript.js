function addInventoryItem(title, imgsrc){
    var newItem = document.createElement("div");
    newItem.classList.add("Item");

    var newTitle = document.createElement("div");
    newTitle.classList.add("itemTitle");
    newTitle.textContent = "New Item";

    var newIcon = document.createElement("img");
    newIcon.classList.add("itemIcon");
    newIcon.src = "new_item.png"; // Replace with the path to your image

    var newMenu = document.createElement("div");
    newMenu.classList.add("itemMenu");

    var select = document.createElement("select");
    var option1 = document.createElement("option");
    option1.value = "0";
    option1.textContent = "Eat";
    var option2 = document.createElement("option");
    option2.value = "1";
    option2.textContent = "Sell";
    var option3 = document.createElement("option");
    option3.value = "2";
    option3.textContent = "Discard";

    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);

    var button = document.createElement("button");
    button.textContent = ">";

    newMenu.appendChild(select);
    newMenu.appendChild(button);

    newItem.appendChild(newTitle);
    newItem.appendChild(newIcon);
    newItem.appendChild(newMenu);

    document.body.appendChild(newItem);

}