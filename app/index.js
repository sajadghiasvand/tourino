const express = require('express');

const multer = require('multer');

const cors = require('cors');
const api = require('./routes/api');
const db = require("./models");
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./../swagger_output.json')
const forms = multer();
const ErrorMiddleware = require('./http/middleware/Error');
const app = express();
require('dotenv').config()


class Application {
    constructor() {
        this.setupExpressServer();
        this.setupSequelize();
        this.setupRoutesAndMiddlewares();
        this.setupConfigs();
    }

    setupRoutesAndMiddlewares() {
        app.use(cors());
        app.use(express.json({limit: '50mb'}));
        app.use(express.urlencoded({extended: true,limit: '50mb'}));
        app.use('/uploads',express.static('uploads'));
        app.get('/', (req, res) => {
            res.send('Welcome');
        });
        app.use('/api', api)
        app.use(ErrorMiddleware);
        app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


    }

    setupConfigs() {

    }

    setupSequelize() {
        db.sequelize.sync({force : false})
            .then(() => {
                console.log("Synced db.");
            })
            .catch((err) => {
                console.log("Failed to sync db: " + err.message);
            });
    }

    setupExpressServer() {
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`listening at http://localhost:${PORT}`);
        });
    }
}

module.exports = Application;





