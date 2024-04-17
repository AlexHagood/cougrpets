const authModel = require("../models/authenticate.js");

function errorHandler(res, error) {
  console.error(error);
  res.status(500).send("Internal server error");
}

async function register(req, res) {
  const { username, password, password2 } = req.body;
  //console.log("username="+username+" password="+password+" password2="+password2)
  //console.log(req)
  authModel
    .checkUser(username)
    .then((userExists) => {
      if (userExists){
        console.log(`Duplicate user ${username} attempted to register`); res.status(400).send("User already exists!");}
      else {
        authModel
        // Both password fields are being passed together, so this takes only the first one
          .registerUser(username, password[0])
          .then(() => {
            console.log(`New user ${username} registered sucessfully!`);
            res.redirect("/inventory");
          })
          .catch((error) => {
            errorHandler(res, error);
          });
      }
    })
    .catch((error) => {
      errorHandler(res, error);
    });
}

async function login() {
    const { username, password} = req.body;
    console.log("Authenticating user "+username+" (check 1)")
    authModel
      .authenticateUser(username, password)
      .then((validLogin) => {
        if (validLogin){
          console.log(`User ${username} logged in`); 
          res.redirect("/inventory")
        } else {
            console.log(`User ${username} failed to log in`); 
            res.status(401).send("Bad login!");
        }
      })
      .catch((error) => {
        errorHandler(res, error);
      });
}


module.exports = {
    register,
    login
};

