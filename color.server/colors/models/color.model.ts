export { };
const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    selectedColor: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Color', colorSchema);