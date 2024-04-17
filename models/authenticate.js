const User = require('./Users')
const Profile = require('./Profile')


async function registerUser(username, password)
{
    // Add a new user to database
    //console.log("Registering "+username+" "+password);
    await User.create({
        username: username,
        password: password,
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
    console.log(user)
    console.log("checking for user "+user.username+" with password "+user.password+" (check 3)")
    if (user){
        return true
    }
    return false
}

async function changePassword(username, oldpassword, newpassword) 
{
    
}

async function changeUsername(oldusername, newusername, password) 
{
    
}

module.exports = {
    registerUser,
    checkUser,
    authenticateUser,
    changePassword,
    changeUsername
}
