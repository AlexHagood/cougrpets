const { where } = require("sequelize");
const authModel = require("../models/authenticate.js");
const { getPetName } = require("../models/pet.js");
const Profile = require("../models/Profile.js");
const Inventory = require("../models/inventory.js");


function errorHandler(res, error) {
  console.error(error);
  res.status(500).send("Internal server error");
}

async function register(req, res) {
  try {
  const { username, password, password2 } = req.body;
  const userExists = await authModel.checkUser(username)

  if (userExists) {

    console.log(`Duplicate user ${username} attempted to register`); 
    res.status(400).send("User already exists!");

  } else {
    
    await authModel.registerUser(username, password[0]);
    createDBsIfEmpty(username);
    console.log(`New user ${username} registered sucessfully!`);
    req.session.user = { username }

    res.redirect("/home");

  }} catch (error){

    console.log("Error registering user");
    console.error(error);
    res.status(500).send("Internal server error");
  }}

async function login(req, res) {
  try{
    const { username, password} = req.body;
    console.log("Authenticating user "+username+" (check 1)")
    userExists = await authModel.checkUser(username);
    if (!userExists)
    {
      console.log("User doesn't exist!")
      res.status(500).send("User not found");
      return
    }

    validLogin = await authModel.authenticateUser(username, password)


    if (validLogin) {
      createDBsIfEmpty(username);
      console.log(`User ${username} logged in`); 
      req.session.user = { username }
      res.redirect("/home")
    } else {
      console.log(`User ${username} failed to log in`); 
      res.status(401).send("Bad login!");}

  } catch (error) {
      console.log("Error logging in");
      console.error(error);
      res.status(500).send("Internal server error");

    }
}

async function createDBsIfEmpty(username){

    const [profile, created] = await Profile.findOrCreate({
      where : {username},
      defaults: {
        petname : "Butch",
        money: 100,
        food: 100,
        happiness: 100
      }
    })

    const [inventory, created2] = await Inventory.findOrCreate({
      where : {username},
      defaults: {
        blackLentil : 1,
        redLentil : 1,
        greenLentil : 1,
        chicken : 1
      }
    })

}


module.exports = {
    register,
    login
};

