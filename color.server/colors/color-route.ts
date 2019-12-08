export { };

const express = require('express');
const ColorModel = require('./models/color.model');
let router = express.Router();
let selectedColor = 'red';

router.route('/colors').get(async (req, res) => {
    try {
        const colors = await ColorModel.find();
        selectedColor = colors[0].selectedColor;
        console.log('Getting selected color: ' + selectedColor);
    }
    catch (err) {
        console.error('Could not read the color from the DB. (using default color "red"): ' + err);
    }
    res.send({
        selectedColor: selectedColor
    });
}).post(async (req, res) => {
    let body = req.body;
    selectedColor = body.selectedColor;
    await ColorModel.remove({}, () => { });
    const color = new ColorModel({ selectedColor: selectedColor });
    await color.save();

    console.log('Setting selected color: ' + selectedColor);
    res.sendStatus(200);
});

module.exports = router;