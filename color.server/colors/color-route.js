"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const ColorModel = require('./models/color.model');
let router = express.Router();
let selectedColor = 'red';
router.route('/colors').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const colors = yield ColorModel.find();
        selectedColor = colors[0].selectedColor;
        console.log('Getting selected color: ' + selectedColor);
    }
    catch (err) {
        console.error('Could not read the color from the DB. (using default color "red"): ' + err);
    }
    res.send({
        selectedColor: selectedColor
    });
})).post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = req.body;
    selectedColor = body.selectedColor;
    yield ColorModel.remove({}, () => { });
    const color = new ColorModel({ selectedColor: selectedColor });
    yield color.save();
    console.log('Setting selected color: ' + selectedColor);
    res.sendStatus(200);
}));
module.exports = router;
//# sourceMappingURL=color-route.js.map