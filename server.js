const express = require("express");
const session = require("express-session")
const app = express();
const fs = require("fs");
path = require("path");
const User = require("./models/Users");
const Profile = require("./models/Profile.js");
const sequelize = require("./db");
const ejs = require("ejs")



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
const inventoryRoutes = require("./routes/inventoryRoutes.js");
const profileRoutes = require("./routes/profileRoutes.js");
const petStatusRoutes = require("./routes/petStatusRoutes.js");
const { sideBarData } = require("./controllers/petStatus.js");
const { error } = require("console");
const buyMoneyRoutes = require("./routes/buyMoney.js");


app.use("/profile", profileRoutes);
app.use("/inventory", inventoryRoutes);
app.use(authenticationRouter);
app.use("/shop", shopRoutes);
app.use("/", sideBarData);
app.use(petStatusRoutes);
app.use("/purchasemoney", buyMoneyRoutes);
//app.use("/games", gameRoutes);


app.get("/", (req, res) => {
	res.redirect("/inventory");
});

app.get("/home", (req, res) => {
	res.redirect("/inventory");
});


// The default router!!
app.use((req, res, next) => {
  // Combine sidebar and content
  console.log("in main")

  
  if (!res.contentHTML)
  {

    res.contentHTML = ejs.renderFile(__dirname + "/views" + req.path + ".ejs")

  }

  console.log(res.sideBarStats)
  res.contentHTML.then((content) => 
  {

    res.render("base", { content: content, happiness : res.sideBarStats.happiness, hunger : res.sideBarStats.hunger, money : res.sideBarStats.money }, (error, html) => {
      if (error) {
        console.error(error)
        res.status(500).send("Site broken on a render.")
      } else {
        res.send(html)
      }
    });

  })

  


});

app.use("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, "favicon.ico"));
});


app.listen(3000, () => {
  console.log(`Server is running at port 3000`);
});


// DB Initialization!
async function setup() {
  try{
  const user1 = await User.create({ username: "admin", password: "admin" });
  const profile1 = await Profile.create({ username: "admin", petname: "Butch", money: 100, food: 50, happiness: 50 });
  const inventory1 = await Inventory.create({username: "admin", blackLentil: 0, greenLentil: 0, redLentil: 0, chicken: 0});
  } catch {
    console.log("Admin account creation failed, likely already exists. Nothing to worry about. ")
  }
}

sequelize.sync({force: true }).then(() => {
  console.log("Sync completed");
  setup().then(() => console.log("New user setup complete"))
})
