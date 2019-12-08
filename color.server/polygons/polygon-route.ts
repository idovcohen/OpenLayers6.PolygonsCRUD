export { }
let express = require('express');
const LayerModel = require('./models/layer.model');
let router = express.Router();

router.route('/polygons')
    .get(async (req, res) => {
        let data = null;
        try {
            const layer = await LayerModel.find();
            data = layer[0].data;
            console.log('Getting the layer data: ' + data);
        }
        catch (err) {
            console.error('Could not read the layer data from the DB: ' + err);
        }
        res.send({ data: data });

    })
    .post(async (req, res) => {
        let body = req.body;
        const data = body.data;
        await LayerModel.deleteMany({}, () => { });
        const layer = new LayerModel({ data: data });
        console.log('Setting the layer data: ' + data);
        await layer.save();
    });

module.exports = router;