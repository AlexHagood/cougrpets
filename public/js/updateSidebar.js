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
    })
    .catch(error => {
        console.error(error)
    })
}