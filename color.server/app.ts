const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();
const ColorModel = require('../color.server/models/color');
const port = 1234;

const app = express();
app.use(cors());
app.use(bodyParser.json());
let selectedColor = 'red';
console.log('Running color server.');
setupMongo();

app.get('/color', async (req, res) => {
    try {
        const colors = await ColorModel.find();
        selectedColor = colors[0].selectedColor;
        console.log('Getting selected color: ' + selectedColor);
    }
    catch (err) {
        console.error('Could not read the color from the DB. (using default color "red"): ' + err);
    }
    res.send({ selectedColor : selectedColor });
});

app.post('/color', async (req, res) => {
    let body = req.body;
    selectedColor = body.selectedColor;
    await ColorModel.remove({}, () => { });
    const color = new ColorModel({ selectedColor: selectedColor });
    await color.save();

    console.log('Setting selected color: ' + selectedColor);
    res.sendStatus(200);
});

let server = app.listen(port, function () {
    console.log("Server listening at http://%s:%s", server.address().address, port);
});

function setupMongo() {
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    const db = mongoose.connection
    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log('connected to the database'))
}
