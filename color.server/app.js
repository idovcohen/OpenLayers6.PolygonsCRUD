const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();
const colorsRoute = require('../color.server/colors/color-route');
const polygonsRoute = require('../color.server/polygons/polygon-route');
const port = 1234;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1', colorsRoute);
app.use('/api/v1', polygonsRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use('/api/v1', router);
console.log('Running color server.');
setupMongo();
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