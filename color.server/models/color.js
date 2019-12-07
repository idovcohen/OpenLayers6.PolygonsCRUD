const mongoose2 = require('mongoose');
const colorSchema = new mongoose2.Schema({
    selectedColor: {
        type: String,
        required: true
    }
});
module.exports = mongoose2.model('Color', colorSchema);
//# sourceMappingURL=color.js.map