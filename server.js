const express = require('express');
const app = express();
const fs = require('fs');
path = require('path');


const templatePath = path.join(__dirname, 'nodetemplate.html');
const templateContent = fs.readFileSync(templatePath, 'utf-8');
app.use(express.static(('.')));


const sidebarPath = path.join(__dirname,  'nodetemplate.html');
const sidebarContent = fs.readFileSync(sidebarPath, 'utf8');

app.use((req, res, next) => {

    console.log("path = " + req.path)


    const contentPath = path.join(__dirname, `${req.path}.html`);
  
    // Read HTML files
    
    const pageContent = fs.readFileSync(contentPath, 'utf8');
  
    // Combine sidebar and content
    let finalHTML = "hmm"
    console.log("first line = " + pageContent.trim().split('\n')[0])
    if (pageContent.trim().split('\n')[0].trim() == "<!NOSIDEBAR>")
    {
        console.log("No siderbar page loaded.")
        finalHTML = `${pageContent};`
    }
    else
    {
        finalHTML = `${sidebarContent}${pageContent};`
    };
  
    // Send the combined HTML as the response
    res.send(finalHTML);
  });





app.listen(3000, () => {
    console.log(`Server is running at port 3000`);
});