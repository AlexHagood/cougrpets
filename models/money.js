const Profile = require('./Profile')


async function getBalance(username){
    // returns user balance\
    profile = await Profile.findByPk(username)
    return profile.money;
}

async function addBalance(username, addition)
{
    profile = await Profile.findByPk(username);
    profile.money = profile.money + addition;
    await profile.save();

}

async function subtractBalance(username, subtraction)
{
    profile = await Profile.findByPk(username)
    profile.money -= subtraction;
    await profile.save();
    
}

module.exports = {getBalance, addBalance, subtractBalance}