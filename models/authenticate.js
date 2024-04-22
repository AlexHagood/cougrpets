const User = require('./Users')
const Profile = require('./Profile')
const Inventory = require('./inventory')
const { use } = require('../routes/authenticate')


async function registerUser(username, password)
{
    // Add a new user to database
    // console.log("Registering "+username+" "+password);
    await User.create({
        username: username,
        password: password,
    })
    await Profile.create({
        username: username,
        petname : "Butch",
        money : 100,
        food: 100,
        happiness : 100
    })
    await Inventory.create({
        username: username, 
        blackLentil: 0, 
        greenLentil: 0, 
        redLentil: 0, 
        chicken: 0
    })
    return true
}

async function checkUser(username){
    // return true if username is take
    //return false
    //console.log("Checking for username: "+username);
    return User.checkUsername(username)
}

async function authenticateUser(username, password)
{
    console.log("checking for user "+username+" with password "+password+" (check 2)")
    // This should return true if the login is valid, false if it isn't
    const user = await User.findUser(username, password)
    //console.log("checking for user "+user.username+" with password "+user.password+" (check 3)")


    if (user){
    console.log("Login success!")
    return true
    } else {
    console.log("Login failed!")
    return false }
}

async function changePassword(user, newpassword) 
{

    profile = await User.findByPk(user)
    profile.password = newpassword;
    await profile.save()
}


module.exports = {
    registerUser,
    checkUser,
    authenticateUser,
    changePassword
}
