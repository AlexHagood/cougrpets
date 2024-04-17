const express = require("express");
const session = require("express-session")
const app = express();
const fs = require("fs");
path = require("path");
const User = require("./models/Users");
const Profile = require("./models/Profile.js");
const sequelize = require("./db");



// Middleware!
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));
app.set("view engine", "ejs");


// Sessioning
app.use(
  session({
    secret: 'temp', // TEMPORARY! Change later with a secrets file
    resave: false,
    saveUninitialized: true,
  })
)


//If a user doesn't log in, they must make an account or log in!
app.use((req, res, next) => {
  if (req.session.user || req.path === "/login" || req.path === "/register") 
  {
    next();
  }
  else {
    res.redirect("/login")
  }
});







// Our routers!!
const authenticationRouter = require("./routes/authenticate.js")
const shopRoutes = require("./routes/shopRoutes.js");
const inventoryRoutes = require("./routes/inventoryRoutes.js")

app.use("/inventory", inventoryRoutes);
app.use(authenticationRouter);
app.use("/shop", shopRoutes);

app.get("/", (req, res) => {
	res.redirect("/inventory");
});


// The default router!!
app.use((req, res, next) => {
  // Combine sidebar and content

  res.render("base", { content: "." + req.path }, (error, html) => {
    if (error) {
      console.log("404 Error!")
      res.status(404).sendFile(__dirname + "/public/404.html")
    } else {
      res.send(html)
    }
  });


});

app.use("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, "favicon.ico"));
});


app.listen(3000, () => {
  console.log(`Server is running at port 3000`);
});


// DB Initialization!

// async function setup(){
//     const user1 = await User.create({username: "Sierra", password:"voiland"});
//     const profile1 = await Profile.create({username: "Sierra", petname:"Ridley"});
// }

// sequelize.sync({force: true}).then(() =>{
//     console.log("Sync completed");
//     setup().then(() => console.log("New user setup complete"))
//   })
