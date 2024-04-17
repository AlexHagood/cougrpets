const authModel = require("../models/authenticate.js");

function errorHandler(res, error) {
  console.error(error);
  res.status(500).send("Internal server error");
}

async function register(req, res) {
  try {
  const { username, password, password2 } = req.body;
  const userExists = await authModel.checkUser(username)

  if (userExists) {

    console.log(`Duplicate user ${username} attempted to register`); res.status(400).send("User already exists!");

  } else {

    await authModel.registerUser(username, password[0]);
    console.log(`New user ${username} registered sucessfully!`);
    req.session.user = { username }
    res.redirect("/inventory");

  }} catch (error){

    console.log("Error registering user");
    console.error(error);
    res.status(500).send("Internal server error");
  }}

async function login(req, res) {
  try{
    const { username, password} = req.body;

    console.log("Authenticating user "+username+" (check 1)")

    validLogin = await authModel.authenticateUser(username, password)

    if (validLogin) {
      console.log(`User ${username} logged in`); 
      req.session.user = { username }
      res.redirect("/inventory")
    } else {
      console.log(`User ${username} failed to log in`); 
      res.status(401).send("Bad login!");}

  } catch (error) {
      console.log("Error logging in");
      console.error(error);
      res.status(500).send("Internal server error");

    }
}


module.exports = {
    register,
    login
};

