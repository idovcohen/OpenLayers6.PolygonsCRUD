export { };
const mongoose = require('mongoose');

const layerSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Layer', layerSchema);