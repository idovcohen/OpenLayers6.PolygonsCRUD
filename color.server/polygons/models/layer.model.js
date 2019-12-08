"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const layerSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Layer', layerSchema);
//# sourceMappingURL=layer.model.js.map