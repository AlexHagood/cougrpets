const express = require("express");
const app = express();
const fs = require("fs");
path = require("path");
const User = require("./models/Users");
const Profile = require("./models/Profile.js");
const sequelize = require("./db");

const authenticationRouter = require("./routes/authenticate.js")
const shopRoutes = require("./routes/shopRoutes.js");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

app.use(authenticationRouter);

app.use("/shop", shopRoutes);

//load the sidebar straihgt into memory, since nearly every page will use it.

app.set("view engine", "ejs");

app.use((req, res, next) => {
  // Combine sidebar and content

  app.get("/", (req, res) => {
    res.redirect("/inventory");
  });

  res.render("base", { content: "." + req.path });


});

app.use("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, "favicon.ico"));
});

app.listen(3000, () => {
  console.log(`Server is running at port 3000`);
});

// async function setup(){
//     const user1 = await User.create({username: "Sierra", password:"voiland"});
//     const profile1 = await Profile.create({username: "Sierra", petname:"Ridley"});
// }

// sequelize.sync({force: true}).then(() =>{
//     console.log("Sync completed");
//     setup().then(() => console.log("New user setup complete"))
//   })
