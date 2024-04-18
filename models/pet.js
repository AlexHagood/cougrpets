async function getPetName(username)
{
    return "Butch"
}

j = 0
async function getPetFullness(username)
{
    removePetFullness()
    return j
}

async function addPetFullness(username, hungerValue)
{
    j += hungerValue

}

async function removePetFullness(username)
{
    j -= 1
}

i = 100

async function getPetHappiness(username)
{
    removePetHappiness()
    return i
}

async function addPetHappiness(username, hungerValue)
{
    i += 15
}

async function removePetHappiness(username)
{
    i-= 1
}

module.exports = {
    getPetName, getPetFullness, addPetFullness, removePetFullness, getPetHappiness, addPetHappiness, removePetHappiness
}
