var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const ColorModel = require('../color.server/models/color');
const port = 1234;
const app = express();
app.use(cors());
app.use(bodyParser.json());
let selectedColor = 'red';
console.log('Running color server.');
setupMongo();
app.get('/color', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const colors = yield ColorModel.find();
        selectedColor = colors[0].selectedColor;
        console.log('Getting selected color: ' + selectedColor);
    }
    catch (err) {
        console.error('Could not read the color from the DB. (using default color "red"): ' + err);
    }
    res.send({ selectedColor: selectedColor });
}));
app.post('/color', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let body = req.body;
    selectedColor = body.selectedColor;
    yield ColorModel.remove({}, () => { });
    const color = new ColorModel({ selectedColor: selectedColor });
    yield color.save();
    console.log('Setting selected color: ' + selectedColor);
    res.sendStatus(200);
}));
let server = app.listen(port, function () {
    console.log("Server listening at http://%s:%s", server.address().address, port);
});
function setupMongo() {
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', (error) => console.error(error));
    db.once('open', () => console.log('connected to the database'));
}
//# sourceMappingURL=app.js.map