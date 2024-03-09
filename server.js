const express = require('express');
const app = express();
path = require('path');

app.use(express.static(__dirname));

app.get('*', (req, res) => {

    const filePath = path.join(__dirname, `${req.path}.html`);
    console.log("trying to serve " + filePath)

    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
});


app.listen(3000, () => {
    console.log(`Server is running at port 3000`);
});