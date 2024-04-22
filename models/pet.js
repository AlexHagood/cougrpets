const Profile = require('./Profile')

async function getPetName(user) {
    return "Butch";
}

async function getPetFullness(user) {
    profile = await Profile.findByPk(user)
    return profile.food
}

async function addPetFullness(username, saturation) {
    profile = await Profile.findByPk(username)
    if (profile.food + saturation > 100) {
        profile.food = 100
    } else {
        profile.food += saturation
    }
        await profile.save()
}

async function removePetFullness(username) {
    profile = await Profile.findByPk(username)
    if (profile.food > 0) {
        profile.food -= 1
        await profile.save()
    }
}



async function getPetHappiness(user) {
    profile = await Profile.findByPk(user)
    return profile.happiness
}

async function addPetHappiness(username, hungerValue) {
    console.log("adding happiness");
    profile = await Profile.findByPk(username)
    if (profile.happiness < 100) {
        profile.happiness += hungerValue
        await profile.save()
    }
}

async function removePetHappiness(username, value) {
    profile = await Profile.findByPk(username)
    if (profile.happiness + value < 0) {
        profile.happiness = 0;
    } else {
        profile.happiness -= value;
    }
        await profile.save()
    }
module.exports = {
    getPetName, getPetFullness, addPetFullness, removePetFullness, getPetHappiness, addPetHappiness, removePetHappiness
}
