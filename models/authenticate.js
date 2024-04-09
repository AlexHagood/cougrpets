
async function registerUser(username, password)
{
    // Add a new user to database
    return true
}

async function checkUser(usermame){
    // return true if username is take
    return false
}

async function authenticateUser(username, password)
{
    // This should return true if the login is valid, false if it isn't
    return true
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
