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
let express = require('express');
const LayerModel = require('./models/layer.model');
let router = express.Router();
router.route('/polygons')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = null;
    try {
        const layer = yield LayerModel.find();
        data = layer[0].data;
        console.log('Getting the layer data: ' + data);
    }
    catch (err) {
        console.error('Could not read the layer data from the DB: ' + err);
    }
    res.send({ data: data });
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = req.body;
    const data = body.data;
    yield LayerModel.deleteMany({}, () => { });
    const layer = new LayerModel({ data: data });
    console.log('Setting the layer data: ' + data);
    yield layer.save();
}));
module.exports = router;
//# sourceMappingURL=polygon-route.js.map