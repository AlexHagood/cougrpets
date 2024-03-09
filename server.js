const express = require('express');
const app = express();
const fs = require('fs');
path = require('path');


const templatePath = path.join(__dirname, 'nodetemplate.html');
const templateContent = fs.readFileSync(templatePath, 'utf-8');
app.use(express.static('.'));

app.use((req, res, next) => {
    const sidebarPath = path.join(__dirname,  'nodetemplate.html');
    const contentPath = path.join(__dirname, `${req.url.slice(1)}.html`);
    console.log(req)
  
    // Read HTML files
    const sidebarContent = fs.readFileSync(sidebarPath, 'utf8');
    const contentPageContent = fs.readFileSync(contentPath, 'utf8');
  
    // Combine sidebar and content
    const combinedHTML = `${sidebarContent}${contentPageContent}`;
  
    // Send the combined HTML as the response
    res.send(combinedHTML);
  });

app.use(express.static(__dirname));



app.listen(3000, () => {
    console.log(`Server is running at port 3000`);
});