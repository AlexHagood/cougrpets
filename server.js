const express = require('express');
const app = express();
const fs = require('fs');
path = require('path');
const User = require('./Users')
const Profile = require('./Profile')
const sequelize = require('./db');


const templatePath = path.join(__dirname, 'nodetemplate.html');
const templateContent = fs.readFileSync(templatePath, 'utf-8');
app.use(express.static(('.')));


const sidebarPath = path.join(__dirname,  'nodetemplate.html');
const sidebarContent = fs.readFileSync(sidebarPath, 'utf8');
//load the sidebar straihgt into memory, since nearly every page will use it.


app.use((req, res, next) => {

    console.log("path = " + req.path)

    const contentPath = path.join(__dirname, `${req.path}.html`);    
    const pageContent = fs.readFileSync(contentPath, 'utf8');
    //fetch the HTML requested and load it into memory
  
    // Combine sidebar and content
    let finalHTML = "hmm"

    app.get('/', (req, res) => {
        res.redirect('/inventory');
    });
    


    // if the first line of a page is <!NOSIDEBAR>, then our server won't add the sidebar code. Useful for the registration and login pages.
    if (pageContent.trim().split('\n')[0].trim() == "<!NOSIDEBAR>")
    {
        console.log("No siderbar page loaded.")
        finalHTML = `${pageContent}`
    }
    else
    {
        finalHTML = `${sidebarContent}${pageContent}`
    };
  
    // Send the combined HTML as the response
    res.send(finalHTML);
  });


app.use('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'favicon.ico'));
})




app.listen(3000, () => {
    console.log(`Server is running at port 3000`);
});


async function setup(){
    const user1 = await User.create({username: "Sierra", password:"voiland"});
    const profile1 = await Profile.create({username: "Sierra", petname:"Ridley"});
}

sequelize.sync({force: true}).then(() =>{
    console.log("Sync completed");
    setup().then(() => console.log("New user setup complete"))
  })