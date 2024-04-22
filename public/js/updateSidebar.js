function updateSidebar() {
    fetch('/updateSidebar', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    .then (Response => Response.json())
    .then(data => {
        document.getElementById("happiness").value = data.happiness;
        document.getElementById("food").value = data.hunger; // has to be a float??
        document.getElementById("balance").textContent = `Balance: $${data.money}`;
        logo = document.getElementById("logo");

        if (data.happiness < 50) {
            logo.src = "images/sad_butch.png"
        } else if (data.happiness < 80) { 
            logo.src="images/neutral_butch.png"
        } else {
            logo.src="images/happy_butch.png"
        }
    })
    .catch(error => {
        console.error(error)
    })
}